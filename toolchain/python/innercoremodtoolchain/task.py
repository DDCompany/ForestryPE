import sys
import os
from os.path import join, exists, basename, isfile, isdir, relpath
import platform
import time

from .utils import ensure_directory, ensure_file_dir, clear_directory, copy_file, copy_directory
from .make_config import MAKE_CONFIG, TOOLCHAIN_CONFIG

registered_tasks = {}
locked_tasks = {}
descriptioned_tasks = {}
devnull = open(os.devnull, "w")

def lock_task(name, silent = True):
	path = TOOLCHAIN_CONFIG.get_path(f"toolchain/temp/lock/{name}.lock")
	ensure_file_dir(path)
	await_message = False

	if exists(path):
		while True:
			try:
				if exists(path):
					os.remove(path)
				break
			except IOError:
				if not await_message:
					await_message = True
					if not silent:
						sys.stdout.write(f"* Task {name} is locked by another process, waiting for it to unlock.")
					if name in locked_tasks:
						error("ERROR: Dead lock detected", code=-2)
				if not silent:
					sys.stdout.write(".")
					sys.stdout.flush()
				time.sleep(0.25)

	if await_message:
		if not silent:
			print("")
	open(path, "tw").close()
	locked_tasks[name] = open(path, "a")

def unlock_task(name):
	if name in locked_tasks:
		locked_tasks[name].close()
		del locked_tasks[name]
	path = TOOLCHAIN_CONFIG.get_path(f"toolchain/temp/lock/{name}.lock")
	if isfile(path):
		os.remove(path)

def unlock_all_tasks():
	for name in list(locked_tasks.keys()):
		unlock_task(name)

def task(name, lock = None, description = None):
	if lock is None:
		lock = []

	def decorator(func):
		def caller(*args, **kwargs):
			lock_task(name, silent=False)
			for lock_name in lock:
				lock_task(lock_name, silent=False)
			if platform.system() == "Windows":
				os.system("color")
			print(f"\x1b[92m> Executing task: {name}\x1b[0m")
			task_result = func(*args, **kwargs)
			unlock_task(name)
			for lock_name in lock:
				unlock_task(lock_name)
			return task_result

		registered_tasks[name] = caller
		if description is not None:
			descriptioned_tasks[name] = description
		return caller

	return decorator

@task(
	"compileNativeDebug",
	lock=["native", "cleanup", "push"],
	description="Compiles C++ in single debugging `debugAbi`, changed objects will be compiled."
)
def task_compile_native_debug(args = None):
	abi = MAKE_CONFIG.get_value("debugAbi", None)
	if abi is None:
		abi = "armeabi-v7a"
		print(f"* No 'debugAbi' value in toolchain.json config, using {abi} as default.")
	from .native.native_build import compile_all_using_make_config
	return compile_all_using_make_config([abi])

@task(
	"compileNativeRelease",
	lock=["native", "cleanup", "push"],
	description="Compiles C++ for everything `abis`."
)
def task_compile_native_release(args = None):
	abis = MAKE_CONFIG.get_value("abis", [])
	if abis is None or not isinstance(abis, list) or len(abis) == 0:
		error(f"No 'abis' value in toolchain.json config, nothing will happened.")
	from .native.native_build import compile_all_using_make_config
	return compile_all_using_make_config(abis)

@task(
	"compileJavaDebug",
	lock=["java", "cleanup", "push"],
	description="Compiles Java, changed classes will be packed into dex."
)
def task_compile_java_debug(args = None):
	from .java.java_build import compile_all_using_make_config
	return compile_all_using_make_config(debug_build=True)

@task(
	"compileJavaRelease",
	lock=["java", "cleanup", "push"],
	description="Compiles Java without debugging information."
)
def task_compile_java_release(args = None):
	from .java.java_build import compile_all_using_make_config
	return compile_all_using_make_config(debug_build=False)

@task(
	"buildScriptsDebug",
	lock=["script", "cleanup", "push"],
	description="Rebuilds changes scripts with excluded declarations."
)
def task_build_scripts_debug(args = None):
	from .script_build import build_all_scripts
	return build_all_scripts(debug_build=True)

@task(
	"buildScriptsRelease",
	lock=["script", "cleanup", "push"],
	description="Assembling scripts without excluding debug declarations, everything script hashes will be rebuilded too."
)
def task_build_scripts_release(args = None):
	from .script_build import build_all_scripts
	from .hash_storage import OUTPUT_STORAGE, BUILD_STORAGE
	OUTPUT_STORAGE.last_hashes = {}
	BUILD_STORAGE.last_hashes = {}
	return build_all_scripts(debug_build=False)

@task(
	"watchScripts",
	lock=["script", "cleanup", "push"],
	description="Watches to script changes, availabled only for TypeScript."
)
def task_watch_scripts(args = None):
	from .script_build import build_all_scripts
	return build_all_scripts(debug_build=True, watch=True)

@task(
	"buildResources",
	lock=["resource", "cleanup", "push"],
	description="Builds resource pathes, like gui and atlases."
)
def task_resources(args = None):
	from .script_build import build_all_resources
	return build_all_resources()

@task(
	"buildInfo",
	lock=["cleanup", "push"],
	description="Builds output mod.info file."
)
def task_build_info(args = None):
	import json
	from .utils import shortcodes
	with open(MAKE_CONFIG.get_path("output/mod.info"), "w") as info_file:
		info = dict(MAKE_CONFIG.get_value("info", fallback={}))

		if "name" in info:
			info["name"] = shortcodes(info["name"])
		if "version" in info:
			info["version"] = shortcodes(info["version"])
		if "description" in info:
			info["description"] = shortcodes(info["description"])
		if "icon" in info:
			del info["icon"]
		if "instantLaunch" in info:
			info["instantLaunch"] = info["instantLaunch"]

		info_file.write(json.dumps(info, indent="\t") + "\n")
	icon_path = MAKE_CONFIG.get_value("info.icon")
	if icon_path is not None:
		icon_path = MAKE_CONFIG.get_absolute_path(icon_path)
		if isfile(icon_path):
			copy_file(icon_path, MAKE_CONFIG.get_path("output/mod_icon.png"))
		else:
			print("Icon in make.json", icon_path, "not found!")
	return 0

@task(
	"buildAdditional",
	lock=["cleanup", "push"],
	description="Copies additional directories, like assets root."
)
def task_build_additional(args = None):
	for additional_dir in MAKE_CONFIG.get_value("additional", fallback=[]):
		if "source" in additional_dir and "targetDir" in additional_dir:
			for additional_path in MAKE_CONFIG.get_paths(additional_dir["source"]):
				if not exists(additional_path):
					print("WARNING: Non existing additional path: " + additional_path)
					break
				target = MAKE_CONFIG.get_path(join(
					"output",
					additional_dir["targetDir"],
					additional_dir["targetFile"] if "targetFile" in additional_dir else basename(additional_path)
				))
				if isdir(additional_path):
					copy_directory(additional_path, target)
				else:
					copy_file(additional_path, target)
	return 0

@task(
	"pushEverything",
	lock=["push"],
	description="Push everything 'output' directory."
)
def task_push_everything(args = None):
	from .device import push
	return push(MAKE_CONFIG.get_path("output"), MAKE_CONFIG.get_value("adb.pushUnchangedFiles", True))

@task(
	"clearOutput",
	lock=["assemble", "push", "native", "java"],
	description="Removes 'output' directory in selected project."
)
def task_clear_output(args = None):
	if MAKE_CONFIG.get_value("development.clearOutput", False) or (args is not None and "--clean" in args):
		clear_directory(MAKE_CONFIG.get_path("output"))
	return 0

@task(
	"excludeDirectories",
	lock=["push", "assemble", "native", "java"],
	description="Removes excluded from release assembling directories."
)
def task_exclude_directories(args = None):
	for path in MAKE_CONFIG.get_value("excludeFromRelease", []):
		for exclude in MAKE_CONFIG.get_paths(join("output", path)):
			if isdir(exclude):
				clear_directory(exclude)
			elif isfile(exclude):
				os.remove(exclude)
	return 0

@task(
	"buildPackage",
	lock=["push", "assemble", "native", "java"],
	description="Performs release mod assembling, already builded 'output' will be used."
)
def task_build_package(args = None):
	import shutil
	output_dir = MAKE_CONFIG.get_path("output")
	name = "forestry-pe" #Очень грубое исправление ошибки при сборке. Ждем фикс от разработчиков.
	output_dir_root_tmp = MAKE_CONFIG.get_build_path("package")
	output_dir_tmp = join(output_dir_root_tmp, name)
	ensure_directory(output_dir)
	if exists(output_dir_tmp):
		shutil.rmtree(output_dir_tmp)
	output_file_tmp = join(output_dir_root_tmp, "package.zip")
	ensure_file_dir(output_file_tmp)
	output_file = MAKE_CONFIG.get_path(name + ".icmod")
	if isfile(output_file):
		os.remove(output_file)
	if isfile(output_file_tmp):
		os.remove(output_file_tmp)
	shutil.copytree(output_dir, output_dir_tmp)
	shutil.make_archive(output_file_tmp[:-4], "zip", output_dir_root_tmp, name)
	shutil.rmtree(output_dir_tmp)
	os.rename(output_file_tmp, output_file)
	return 0

@task(
	"launchHorizon",
	description="Launch Horizon with pack auto-launch."
)
def task_launch_horizon(args = None):
	from subprocess import call
	from .device import adb_command
	call(adb_command + [
		"shell", "touch",
		"/storage/emulated/0/games/horizon/.flag_auto_launch"
	], stdout=devnull, stderr=devnull)
	return call(adb_command + [
		"shell", "monkey",
		"-p", "com.zheka.horizon",
		"-c", "android.intent.category.LAUNCHER", "1"
	], stdout=devnull, stderr=devnull)

@task(
	"stopHorizon",
	description="Force stops Horizon via ADB."
)
def stop_horizon(args = None):
	from subprocess import call
	from .device import adb_command
	return call(adb_command + [
		"shell",
		"am",
		"force-stop",
		"com.zheka.horizon"
	], stdout=devnull, stderr=devnull)

@task(
	"loadDocs",
	description="Fetches latest declarations, incompatible with 'declarations' component right now; toolchain uses unrealized adapted-script implementation."
)
def task_load_docs(args = None):
	from urllib.request import urlopen
	print("Downloading core-engine.d.ts")
	response = urlopen("https://docs.mineprogramming.org/headers/core-engine.d.ts")
	content = response.read().decode("utf-8")

	declaration_path = TOOLCHAIN_CONFIG.get_path("toolchain/declarations")
	if not exists(declaration_path):
		os.mkdir(declaration_path)
	with open(join(declaration_path, "core-engine.d.ts"), "w") as docs:
		docs.write(content)

	print("Complete!")
	return 0

@task(
	"updateIncludes",
	description="Rebuilds composite tsconfig.json without script building, used mostly to update typings."
)
def task_update_includes(args = None):
	from .script_build import compute_and_capture_changed_scripts, get_allowed_languages
	compute_and_capture_changed_scripts(get_allowed_languages(), True)
	from .workspace import WORKSPACE_COMPOSITE
	WORKSPACE_COMPOSITE.flush(True)
	return 0

@task(
	"configureADB",
	description="Interactively configures new ADB connections."
)
def task_configure_adb(args = None):
	from . import device
	device.setup_device_connection()
	return 0

@task(
	"newProject",
	description="Interactively creates new project."
)
def task_new_project(args = None):
	from .package import new_project

	index = new_project(MAKE_CONFIG.get_value("defaultTemplate", "../toolchain-mod"))
	if index is None:
		print()
		print("Abort.")
		exit(0)
	print("Successfully completed!")

	from .project_manager import PROJECT_MANAGER
	try:
		if input("Select this project? [Y/n] ")[:1].lower() == "n":
			return 0
	except KeyboardInterrupt:
		pass
	PROJECT_MANAGER.select_project(index=index)
	return 0

@task(
	"importProject",
	description="Import project by required location into output folder, if output is not specified, 'toolchain/<unique_name>' will be used by default."
)
def task_import_project(args = None):
	import importlib
	module = importlib.import_module(".import", __package__) # import cannot use name '.import' of course
	path = module.import_project(args[0] if args is not None and len(args) > 0 else None, args[1] if args is not None and len(args) > 1 else None)
	print("Project successfully imported!")

	from .project_manager import PROJECT_MANAGER
	try:
		if input("Select this project? [Y/n] ")[:1].lower() == "n":
			return 0
	except KeyboardInterrupt:
		pass
	PROJECT_MANAGER.select_project(folder=relpath(path, TOOLCHAIN_CONFIG.root_dir))
	return 0

@task(
	"removeProject",
	lock=["cleanup"],
	description="Removes project in interactive mode."
)
def task_remove_project(args = None):
	from .project_manager import PROJECT_MANAGER
	if PROJECT_MANAGER.how_much() == 0:
		error("Not found any project to remove.")

	print("Selected project will be deleted forever, please think twice before removing anything!")
	who = PROJECT_MANAGER.require_selection("Which project will be deleted?", "Do you really want to delete {}?", "I don't want it anymore")
	if who is None:
		exit(0)

	if PROJECT_MANAGER.how_much() > 1:
		try:
			if input("Do you really want to delete it? [Y/n] ")[:1].lower() == "n":
				print("Abort.")
				return 0
		except KeyboardInterrupt:
			pass

	try:
		location = TOOLCHAIN_CONFIG.get_absolute_path(who)
		PROJECT_MANAGER.remove_project(folder=who)
		from .make_config import ToolchainMakeConfig
		from .package import cleanup_relative_directory
		cleanup_relative_directory("toolchain/build/" + ToolchainMakeConfig.unique_folder_name(location))
	except ValueError:
		error(f"Folder '{who}' not found!")

	print("Project permanently deleted.")
	return 0

@task(
	"selectProject",
	lock=["cleanup"],
	description="Selects project by specified location, otherwise interactive project selection will be shown to explore availabled projects specified in 'projectLocations' property."
)
def task_select_project(args = None):
	from .project_manager import PROJECT_MANAGER
	if args is not None and len(args) > 0 and len(args[0]) > 0:
		path = args[0]
		if isfile(path):
			path = join(path, "..")
		where = relpath(path, TOOLCHAIN_CONFIG.root_dir)
		if isdir(path):
			if where == ".":
				error("Requested project path must be reference to mod, not toolchain itself.")
			if not isfile(join(path, "make.json")):
				error(f"Not found make.json in '{where}', it not belongs to project yet.")
			PROJECT_MANAGER.select_project_folder(folder=where)
			return 0
		else:
			error(f"Requested project path '{where}' does not exists.")

	if PROJECT_MANAGER.how_much() == 0:
		error("Not found any project to choice.")

	who = PROJECT_MANAGER.require_selection("Which project do you choice?", "Do you want to select {}?")
	if who is None:
		exit(0)

	try:
		PROJECT_MANAGER.select_project(folder=who)
	except ValueError:
		error(f"Folder '{who}' not found!")
	return 0

@task(
	"updateToolchain",
	description="Upgrades toolchain by downloading deploy branch, installed components will be upgraded if user accepts it."
)
def task_update_toolchain(args = None):
	from .update import update_toolchain
	update_toolchain()
	from .component import fetch_components, install_components
	upgradable = fetch_components()
	if len(upgradable) > 0:
		print("Found new updates for components: ", ", ".join(upgradable), ".", sep="")
		try:
			if input("Do you want to upgrade it? [Y/n] ")[:1].lower() == "n":
				print("Abort.")
				return 0
		except KeyboardInterrupt:
			pass
		install_components(upgradable)
	return 0

@task(
	"componentIntegrity",
	description="Upgrade and install new components, additionally used when startup phase is active."
)
def task_component_integrity(args = None):
	from .component import foreign
	return foreign()

@task(
	"cleanup",
	description="Performs project 'output' folder cleanup, if nothing selected everything build cache will be removed."
)
def task_cleanup(args = None):
	from .package import cleanup_relative_directory
	if MAKE_CONFIG.current_project is not None:
		try:
			if input("Do you want to clear only selected project (everything cache will be cleaned otherwise)? [Y/n] ")[:1].lower() == "n":
				cleanup_relative_directory("toolchain/build")
				return 0
		except KeyboardInterrupt:
			pass
		cleanup_relative_directory("toolchain/build/" + MAKE_CONFIG.project_unique_name)
		cleanup_relative_directory("output", True)
		return 0
	else:
		try:
			if input("Do you want to clear all projects cache? [Y/n] ")[:1].lower() == "n":
				print("Abort.")
				return 0
		except KeyboardInterrupt:
			pass
	cleanup_relative_directory("toolchain/build")
	return 0

def error(message, code = -1):
	unlock_all_tasks()
	print(message)
	exit(code)


if __name__ == "__main__":
	if "--help" in sys.argv:
		print("Usage: task.py <tasks> @ [arguments]")
		print(" " * 2 + "--help: Just show this message.")
		print(" " * 2 + "--list: See all availabled tasks.")
		print("Executes declared by @task annotation required tasks.")
		exit(0)

	if "--list" in sys.argv:
		print("All availabled tasks:")
		for name in registered_tasks:
			print(" " * 2 + name, end="")
			print(": " + descriptioned_tasks[name] if name in descriptioned_tasks else "")
		exit(0)

	argv = sys.argv[1:]

	# Anything after "@" passes as global arguments
	if "@" in argv:
		where = argv.index("@")
		args = argv[where + 1:]
		argv = argv[:where]
	else:
		args = None

	if len(argv) > 0:
		for task_name in argv:
			if task_name in registered_tasks:
				try:
					result = registered_tasks[task_name](args)
					if result != 0:
						print()
						error(f"* Task {task_name} failed with result {result}.", code=result)
				except BaseException as err:
					if isinstance(err, SystemExit):
						raise err

					import traceback
					traceback.print_exc()
					error(f"* Task {task_name} failed with above error!")
			else:
				print(f"* No such task: {task_name}.")
	else:
		error("* No tasks to execute.")

	unlock_all_tasks()
