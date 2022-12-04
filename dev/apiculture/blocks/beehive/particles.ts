if (ForestryConfig.particlesBeeHives) {
    const beesParticleEmitter = new Particles.ParticleEmitter(0, 0, 0);

    const BeeParticles = [
        //forest
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            render: 2
        }),
        //meadows
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [1, 0.7, 0.7, 1],
            render: 2
        }),
        //modest
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [1, 1, 0.7, 1],
            render: 2
        }),
        //tropical
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [0.1, 0.3, 0, 0.2],
            render: 2
        }),
        //wintry
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [0.4, 1, 1, 0.8],
            render: 2
        }),
        //marshy
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [0.1, 0.3, 0, 0.7],
            render: 2
        }),
        //ender
        Particles.registerParticleType({
            texture: "bee",
            size: [0.5, 0.5],
            lifetime: [80, 80],
            color: [0.8, 0, 1, 1],
            render: 2
        })
    ];

    function spawnBeeParticles(type: number, x: number, y: number, z: number) {
        let amount = Util.random(2, 4);
        for (; amount > 0; amount--) {
            let xa = Math.random() <= 0.5 ? 0.02 : 0;
            let ya = Math.random() <= 0.5 ? 0.02 : 0;
            let za = Math.random() <= 0.5 ? 0.02 : 0;

            if (Math.random() <= 0.5) {
                xa = -xa;
                za = -za;
            }

            beesParticleEmitter.emit(type, 0, x + .5, y + .5, z + .5, xa, ya, za);
        }
    }

    Block.setAnimateTickCallback(BlockID.beehiveForestry, (x, y, z, id, data) => {
        spawnBeeParticles(BeeParticles[data], x, y, z);
    });
}