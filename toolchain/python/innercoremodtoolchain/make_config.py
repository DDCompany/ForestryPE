import os
from os.path import join, basename, abspath, exists, isfile, isdir, realpath
import platform
import sys
import json

from .base_config import BaseConfig

try:
	from hashlib import blake2s as encode
except ImportError:
	from hashlib import md5 as encode

class MakeConfig(BaseConfig):
	def __init__(self, filename, base = None):
		if not isfile(filename):
			from .task import error
			error(f"Not found {basename(filename)}, are you sure that selected project exists?")
		self.filename = filename
		self.root_dir = abspath(join(self.filename, ".."))
		with open(filename, encoding="utf-8") as file:
			self.json = json.load(file)
		if base is not None:
			if "global" in self.json:
				globalconfig = self.get_value("global", {})
				for entry in globalconfig:
					self.set_value(entry, globalconfig[entry])
				self.remove_value("global")
				self.save()
			if "make" in self.json:
				makeconfig = self.get_value("make", {})
				if "linkNative" in makeconfig:
					self.set_value("linkNative", makeconfig["linkNative"])
				if "excludeFromRelease" in makeconfig:
					self.set_value("excludeFromRelease", makeconfig["excludeFromRelease"])
				self.remove_value("make")
				self.save()
		BaseConfig.__init__(self, self.json, base)

	def save(self):
		with open(self.filename, "w", encoding="utf-8") as make_file:
			make_file.write(json.dumps(self.json, indent="\t") + "\n")

	def get_absolute_path(self, path):
		relative_path = self.get_path(path)
		return relative_path if exists(relative_path) else abspath(path) if exists(abspath(path)) else relative_path

	def get_path(self, relative_path):
		return abspath(join(self.root_dir, relative_path))

	def get_paths(self, relative_path, filter = None, paths = None):
		if paths is None:
			paths = []
		if len(relative_path) > 0 and relative_path[-1] == "*":
			path = self.get_path(relative_path[:-1])
			if not isdir(path):
				return []
			for filename in os.listdir(path):
				file = join(path, filename)
				if filter is None or filter(file):
					paths.append(file)
		else:
			path = self.get_path(relative_path)
			if filter is None or filter(path):
				paths.append(path)
		return paths

	def get_adb(self):
		try:
			import shutil
			if shutil.which("adb") is not None:
				return "adb"
		except:
			pass
		if platform.system() == "Windows":
			return self.get_path("toolchain/adb/adb.exe")
		return self.get_path("toolchain/adb/adb")

class ToolchainMakeConfig(MakeConfig):
	def __init__(self, filename):
		prototype = MakeConfig(filename)
		self.current_project = prototype.get_value("currentProject")
		if self.current_project is None and len(prototype.get_value("projectLocations", [])) == 0:
			self.current_project = "."
		if self.current_project is not None:
			make_path = prototype.get_absolute_path(self.current_project + "/make.json")
			if isfile(make_path):
				MakeConfig.__init__(self, make_path, MakeConfig(filename))
				self.project_unique_name = self.unique_folder_name(self.root_dir)
				return
			self.current_project = None
		MakeConfig.__init__(self, filename)

	def assure_project_selected(self):
		if self.current_project is None:
			from .task import registered_tasks
			print("Not found any opened project, nothing to do.")
			registered_tasks["selectProject"]()
			return MAKE_CONFIG.assure_project_selected()

	def get_path(self, relative_path):
		self.assure_project_selected()
		return MakeConfig.get_path(self, relative_path)

	def get_absolute_path(self, path):
		self.assure_project_selected()
		return MakeConfig.get_absolute_path(self, path)

	def get_paths(self, relative_path, filter = None, paths = None):
		self.assure_project_selected()
		return MakeConfig.get_paths(self, relative_path, filter, paths)

	def get_build_path(self, relative_path):
		self.assure_project_selected()
		return self.prototype.get_path(join(
			"toolchain", "build", self.project_unique_name, relative_path
		))

	@staticmethod
	def unique_folder_name(path):
		return basename(path) + "-" + encode(bytes(path, "utf-8")).hexdigest()[-5:]


def find_config(path, filename):
	working_path = path.split(os.sep)
	while len(working_path) > 1:
		config_path = join(os.sep.join(working_path), filename)
		if isfile(config_path):
			return ToolchainMakeConfig(config_path)
		working_path.pop()

# Search for toolchain.json or make.json
for filename in ("toolchain.json", "make.json"):
	MAKE_CONFIG = find_config(os.getcwd(), filename)
	if MAKE_CONFIG is None and len(sys.argv[0]) > 0:
		MAKE_CONFIG = find_config(join(sys.argv[0], ".."), filename)
	if MAKE_CONFIG is None:
		try:
			MAKE_CONFIG = find_config(realpath(join(__file__, "..")), filename)
		except NameError:
			pass
	if MAKE_CONFIG is not None:
		break

if MAKE_CONFIG is None:
	raise RuntimeError("Not found toolchain.json or project make.json! Please, make sure that it appears in your working directory or any of it parents.")
TOOLCHAIN_CONFIG = MakeConfig(MAKE_CONFIG.filename) \
	if MAKE_CONFIG.current_project is None else MAKE_CONFIG.prototype
