const playground = {
    dom: document.getElementById('Playground'),
    get width() {
        return this.dom.getBoundingClientRect().width;
    },
    get height() {
        return this.dom.getBoundingClientRect().height;
    },
    get top() {
        return this.dom.getBoundingClientRect().top;
    }
}

const balle = {
    dom: document.getElementById('balle'),
    _x: 700,
    _y: 360,
    vx: 4,
    vy: 4,
    get width() {
        return this.dom.getBoundingClientRect().width;
    },
    get height() {
        return this.dom.getBoundingClientRect().height;
    },
    get x() {
        return this._x;
    },
    get y() {
        return this._y;
    },
    set x(v) {
        this._x = v;
        this.dom.style.left = v.toString() + "px";
    },
    set y(v) {
        this._y = v;
        this.dom.style.top = v.toString() + "px";
    }
}

const joueur1 = {
    dom: document.getElementById('joueur1'),
    _x: 0,
    _y: 0,
    get width() {
        return this.dom.getBoundingClientRect().width;
    },
    get height() {
        return this.dom.getBoundingClientRect().height;
    },
    get x() {
        return this._x;
    },
    get y() {
        return this._y;
    },
    set x(v) {
        this._x = v;
        this.dom.style.left = v.toString() + "px";
    },
    set y(v) {
        if (v < 600) {
            this._y = v;
            this.dom.style.top = v.toString() + "px";
        }
    }

}

const joueur2 = {
    dom: document.getElementById('joueur2'),
    _x: 0,
    _y: 0,
    get width() {
        return this.dom.getBoundingClientRect().width;
    },
    get height() {
        return this.dom.getBoundingClientRect().height;
    },
    get x() {
        return this._x;
    },
    get y() {
        return this._y;
    },
    set x(v) {
        this._x = v;
        this.dom.style.left = v.toString() + "px";
    },
    set y(v) {
        this._y = v;
        this.dom.style.top = v.toString() + "px";
    }
}

const oneKey = (event) => {
    let key = event.key;
    switch (key) {
        case "s":
            if (game.isRunning) {
                game.stop();
            } else {
                game.start();
            }
            break;
    }
}
const music = new Audio('../tennis/music/Beastie Boys - No Sleep Till Brooklyn.mp3');
const game = {
    isRunning: false,

    start: function () {
        this.isRunning = true;
        window.requestAnimationFrame((date) => {
            animation.time = date;
            animation(date);
            music.play();
            music.loop = true;
        });
    },
    stop: function () {
        this.isRunning = false;
        music.currentTime = 0;
    }
}

const deplaceJoueur1 = (joueur) => {
    /* Fonctions qui permet au joueurs de se déplacer */
    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp":
                joueur1.y -= 0.1;
                break;
            case "ArrowDown":
                joueur1.y += 0.1;
                break;
        }
    });
}

const deplaceJoueur2 = (joueur) => {
    document.addEventListener("keydown", function (event) {
        let lettre = String.fromCharCode(event.key);
        switch (lettre) {
            case "z":
                joueur2.y -= 0.1;
                break;
            case "a":
                joueur2.y += 0.1;
                break;
        }
    });
}

const lanceBalle = () => {
    balle.x -= balle.vx;
    balle.y -= balle.vy;

    if (balle._y < 0) {
        balle.vy *= -1;
        /* En haut */
    } else if (balle._y >= (playground.height - 60)) {
        balle.vy *= -1;
        /* En bas */
    } else if (balle.x < 0) {
        balle.vx *= -1;
      //  game.stop();
        /* A gauche */
    } else if (balle.x >= (playground.width - 60 )) {
        balle.vx *= -1;
       // game.stop();
        /*  A droite */
    }
}

const animation = (time) => {
    const callBackId = window.requestAnimationFrame(animation);
    if (!game.isRunning) {
        window.cancelAnimationFrame(callBackId);
        music.pause();
    }
    // permet au joueurs de se déplacer tant que la partie est en cours  
    lanceBalle();
    deplaceJoueur1(joueur1);
    deplaceJoueur2(joueur2);
    if(balle.x <= (joueur1._x - 80)&& balle.y <= (joueur1.y - 80)){
        balle.vx *= -1;
    }

}

document.addEventListener("keydown", oneKey);