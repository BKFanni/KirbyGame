import { makePlayer } from "./entities";
import { k } from "./kaboomCtx";
import { makeMap } from "./utils";

async function gameSetup() {
    k.loadSprite("assets", "./kirby-like.png", {
        sliceX: 9,
        sliceY: 10,
        anims: {
            kirbIdle: 0,
            kirbInhaling: 1,
            kirbFull: 2,
            kirbInhaleEffect: { from: 3, to: 8, speed: 15, loop: true },
            shootingStar: 9,
            flame: { from: 36, to: 37, speed: 4, loop: true },
            guyIdle: 18,
            guyWalk: { from: 18, to: 19, speed: 4, loop: true },
            bird: { from: 27, to: 28, speed: 4, loop: true},
        },
    });

    k.loadSprite("level-1", "./level-1.png");

    const { map: level1Layout, spawnPoints: level1SpawnPoints } = await makeMap(
        k,
        "level-1"
    );

    k.scene("level-1", () => {
        k.setGravity(2100);
        k.add([k.rect(k.width(), k.height()),
               k.color(k.Color.fromHex("#f7d7db")),
               k.fixed(),
        ]);

        k.add(level1Layout);

        const kirb = makePlayer(
        k,
        level1SpawnPoints.player[0].x,
        level1SpawnPoints.player[0].y
      );

      k.add(kirb);
      k.camScale(0.7, 0.7);
      k.onUpdate(() => {
        if (kirb.pos.x < level1Layout.pos.x + 432)
            k.camPos(kirb.pos.x + 500, 800);
      });
    });


    k.go("level-1");
}

gameSetup();