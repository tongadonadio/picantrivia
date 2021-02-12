var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var games = [];
var users = [];

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.status(200).send("Hello mundo!");
})

io.on('connection', function(socket) {
    console.log("Alguien se conectó con sockets");

    socket.on('login', (username) => {
        let user = createUser(username);
        user.id = users.length;
        users.push(user);

        console.log(users);
        io.sockets.emit('login', user;
    });

    socket.on('new_game', (name) => {
        let game = createGame(name);
        game.id = games.length;
        games.push(game);

        console.log(games);
        io.sockets.emit('new_game', game);
    });

    socket.on('new_round', (gameId) => {
        let round = createGame();
        let question = questions[Math.floor(Math.random() * questions.length)];
        round.question = question;

        let game = games[id];
        game.round = round;

        console.log(round);
        io.sockets.emit('new_round', round);
    });
})

server.listen(8080, function() {
    console.log("Servidor corriendo en 8080");
})



//Game
function createGame(name) {
    let game = {
        id:0,
        name: name,
        user: {},
        players: [],
        round: {}
    }

    return game;
}

//Round
function createRound() {
    let round = {
        id: 0,
        question: "",
        duration: 10,
        reader: {},
        winner: {},
        winnerAnswer: "",
        answers: []
    }
    
    return round;
}

//User
function createUser(username){
    let user = {
        id: 0,
        username: username,
        score:0
    }

    return user;
}

//QUESTIONS ----------------------------------------------------------------------------------------------------------------------------------------------------------------

const questions = [
    "El motívo por el cual voy a trabajar todos los días es (RESP)",
    "Cada vez que alguien entra al baño, siento olor a (RESP)",
    "Cuando era chico y me juntaba con amigos, pasabamos horas jugando con (RESP)",
    "Durante el sexo, me gusta pensar en (RESP)",
    "La medicina china se basa en las propiedades curativas de (RESP)",
    "El año pasado, lo que mas vendió Amazon fue (RESP)",
    "El motivo de que esté así de pegajoso es que (RESP)",
    "Lo que ayuda a mi vecino a relajarse es (RESP)",
    "Lo peor de la guerra es ver (RESP)",
    "Lo que no me gustaría encontrar adentro de un plato de sopa es (RESP)",
    "Este año a los niños que se porten bien, Papa Noel les traerá (RESP)",
    "La relación con mi pareja se mantiene estable gracias a (RESP)",
    "Cuando sea Presidente, crearé el ministerio de (RESP)",
    "Mi superpoder secreto es (RESP)",
    "Lo que no me deja dormir bien por las noches es (RESP)",
    "Cuando veo a un niño en la calle pienso en (RESP)",
    "Cuando paso por la puerta de una iglesia pienso en (RESP)",
    "Cuando me voy de viaje, lo primero que pongo en la maleta es (RESP)",
    "Me da mucho miedo subirme a un avión y ver (RESP)",
    "Nada es tan desagradable como masturbarse pensando en (RESP)",
    "Una vez encontré (RESP) debajo de la almohada de mi madre",
    "Mi vida sexual es comparable con (RESP)",
    "Me pone loco ver (RESP) en la calle",
    "Cuando huelo un (RESP) se me ponen los ojos blancos",
    "Cuando veo al perro de mi mejor amigo me acuerdo de (RESP)",
    "El aumento de la prostitución se debe a (RESP)",
    "Cuando me quiero dormir, en vez de ovejas me pongo a contar (RESP)",
    "Cuando voy al supermercado, lo primero en la lista es (RESP)",
    "Me da mucho miedo que a mi siguiente cita no le guste (RESP)",
    "Cuando me junto con mis amigos, lo primero que hacemos es (RESP)",
    "La última vez que vi a mi jefe, me preguntó si me gustaba (RESP)",
    "Cuando mi vecino llega a su casa, me doy cuenta porque hay olor a (RESP)",
    "Cuando era chico, soñaba con (RESP)",
    "Cuando salgo a comer, lo primero que le pregunto al mozo es si tiene (RESP)",
    "Lo que Dios jamás nos perdonaría es pensar en (RESP)",
    "Lo que mas le excita a mi pareja es (RESP)",
    "El médico me dijo que de ahora en mas nada de (RESP)",
    "Cada vez que voy al médico me recomienda (RESP)",
    "Esperar al matrimonio para tener sexo es como (RESP)",
    "Cuando estoy viendo una pelicula de terror y veo (RESP), luego no puedo dormir",
    "¿Qué es lo que no te gustaría encontrar entre las sábanas del hotel?",
    "El día que sea millonario, lo primero que voy a hacer es (RESP)",
    "El día que me vaya de mi país, lo que mas voy a extrañar es (RESP)",
    "El otro día tuve una pesadilla. Soñé que me atacaba (RESP)",
    "Cuando era chico y veía por la calle (RESP), me daban ganas de ir a tocarlo",
    "Lo primero que me enseñó la maestra en el colegio fue (RESP)",
    "El día que tenga un hijo, lo que no le perdonaría es que le guste (RESP)",
    "Este año me gustaría viajar a China, y mis amigos me dijeron que ahí es común ver (RESP)",
    "Lo que más le gusta a las mujeres es (RESP)",
    "Lo que más le gusta a los hombres es (RESP)",
    "Cuando es mi cumpleaños, de regalo siempre pido (RESP)",
    "Cuando me dijeron que Papa Noel no existía, lo primero que hice fue (RESP)",
    "Mi primera relación sexual es comparable con (RESP)",
    "La siguiente guerra mundial va a ser provocada por (RESP)",
    "La próxima vez que vea a mi abuela, le voy a proponer (RESP)",
    "El sueño de mi hermano menor es (RESP)",
    "Si un día termino preso, lo que mas me gustaría es tener (RESP)",
    "Cuando voy al cine, lo primero que hago es preguntar si hay películas sobre (RESP)",
    "Cada vez que salgo con mi perro, no deja de ladrar cuando ve (RESP)",
    "Más vale pájaro en mano que (RESP)",
    "Cada vez que mi Abuela viene a visitarme, me trae (RESP) de regalo",
    "Ayer mi hermano menor, me preguntó qué pensaba sobre (RESP)",
    "Cuando quiero concentrarme, me pongo a pensar en (RESP)",
    "Lo que realmente me ayudó a salvar mi exámen de filosofía fue hablar sobre (RESP)",
    "Mi madre se acaba de tatuar (RESP) en el medio de la frente",
    "El motivo del aumento de la tasa de natalidad en los últimos años se debe a (RESP)",
    "Cuando mi madre me dijo que estaba embarazada, lo primero que pense fue en (RESP)",
    "Cuando me dijeron que iba a tener un hijo, se me vino la imagen a la cabeza de (RESP)",
    "Cuando mi abuela me dijo que quería tener un hijo, le recomendé (RESP)",
    "Mi primer beso fue similar a (RESP)",
    "Lo que importa no es el tamaño, lo que sí importa es (RESP)",
    "Subir el Everest es realmente difícil, pero mas difícil aún es (RESP)",
    "Más vale prevenir que (RESP)",
    "Dios le da pan a quien no tiene (RESP)",
    "Vísteme despacio que tengo (RESP)",
    "El sabio siempre quiere aprender, el ignorante siempre quiere (RESP)",
    "Para muestra, alcanza (RESP)",
    "En casa de herrero, (RESP)",
    "Antes de morir, Nostradamus predijo la llegada de (RESP)",
    "Piedra, papel o (RESP)",
    "Ayer fui a comprarme una camisa, cuando llegué a casa y abrí la bolsa, había (RESP)",
    "Nada le gusta tanto a un cura como (RESP)",
    "Trágico accidente en la ruta. La causa fue: (RESP)",
    "El motivo por el cual vine a este mundo es (RESP)",
    "El desayuno preferido de un cura es (RESP)",
    "Nada más lindo que despertarse y sentir el olor de (RESP)",
    "El motivo por el cual estoy con mi pareja es que le gusta (RESP)",
    "El motivo por el cual estudié medicina es para ver de cerca (RESP)",
    "Cada vez hay más gente con fobia a (RESP)",
    "El motivo por el cual existen los Kamikaze es por su creencia a (RESP)",
    "Se dice que los Espartanos no le tenian miedo a nada, salvo a (RESP)",
    "Lo que nunca podía faltar en las fiestas de los Romanos era (RESP)",
    "Cuando Colón llegó a América, lo primero que le dieron los indígenas fue (RESP)",
    "El otro dia fui a tatuarme un dragón en la espalda, pero cuando fui a fijarme me habian hecho (RESP)",
    "Cada vez que voy a la playa, me encuentro flotando en el agua (RESP)",
    "Se dice que la debilidad de Aquiles era su talón, pero su verdadera debilidad era (RESP)",
    "Se dice que los dinosaurios se extinguieron por un meteorito, pero el verdadero motivo fue (RESP)",
    "Cuando llega el Black Friday, lo que no puedo dejar pasar es (RESP)",
    "Cada vez que veo un vendedor ambulante, le pregunto si tiene (RESP)",
    "Hay cosas que tienen poco sentido, pero lo que no tiene ningún sentido es (RESP)",
    "Cuando me enteré que a mi madre le gustaba (RESP), me sentí muy decepcionado",
    "En mi historial pornográfico pueden encontrar videos con (RESP)",
    "La teoría de la relatividad desarrollada por Albert Einstein está basada en (RESP) ",
    "Se dice que mientras Leonardo Da Vinci pintaba la Mona Lisa, se inspiraba en (RESP)",
    "La 2da Guerra Mundial fue realmente impactante ya que los soldados eran capaces de (RESP) ",
    "Se dice que en Marte podría haber vida extraterreste, pero lo que sí se sabe es que hay (RESP) ",
    "El motivo por el cual mucha gente no sabe andar en bicicleta es (RESP)",
    "Cada vez que escucho un niño gritando, pienso en (RESP)",
    "El motivo por el aumento de la pobreza a nivel mundial es debido a (RESP)",
    "Antes de morir, mi último deseo sería (RESP)",
    "Siempre que viajo a otro país, me llama mucho la atención (RESP)",
    "Mi mejor amigo es bastante morboso. Lo que más le excita es (RESP)",
    "Después de tener sexo, lo peor es (RESP)",
    "A mitad del sexo, por lo general me dan ganas de (RESP)",
    "Mi vecino me dijo que si le compraba el auto, me regalaba (RESP)",
    "La capacidad de concentración de los monjes tibetanos es gracias a (RESP)",
    "Le dije a mi vecino que si bajaba la música, le regalaba (RESP)",
    "Mi vecina es realmente sexy, el problema es que le gusta (RESP)",
    "Cuando voy al médico, me gusta que me pregunte sobre (RESP)",
    "A las personas que hacen el mal, los obligaría a (RESP)",
    "Cada vez que entro a Netflix, me recomienda una serie sobre (RESP)",
    "Hasta el día de hoy me arrepiento de (RESP)",
    "Según un estudio realizado recientemente, la infidelidad repetitiva se debe a (RESP)",
    "Según un cura amigo mio, la pedofília es causada mayormente por (RESP)",
    "El sexo entre amigos tiene como efecto secundario (RESP)",
    "Prefiero (RESP) que ir a trabajar todos los días",
    "Según mi abuela, mirar porno por la mañana produce (RESP)",
    "Cuando le debo dinero a un amigo, trato de pagarle con (RESP)",
    "Cada vez que me voy de vacaciones, lo que más extraño es (RESP)",
    "Me encanta leer novelas sobre (RESP)",
    "Cuando era chico, me gustaba ir al supermercado para (RESP)",
    "Jugando con amigos al Verdad o consecuencia, me tocó como prueba (RESP)",
    "Cada vez que tomo por demás, termino soñando con (RESP)",
    "La hambruna mundial podría terminarse si la gente estuviera dispuesta a (RESP)",
    "Lo peor de ir a una orgía es (RESP)",
    "El dueño del apartamento donde vivo, me dijo que este mes no quería plata, quería (RESP)",
    "Con mi pareja anterior, terminamos cuando me enteré que tenía (RESP)",
    "Cuando era chico, antes de que terminara la clase, la maestra nos hablaba de (RESP)",
    "Dicen que el mejor remedio para terminar con la resaca es (RESP)",
    "Cuando me recibí, mis padres me regalaron (RESP)",
    "Cuando nació mi octavo hermano, le recomendé a mi madre (RESP)",
    "Con lo que siempre me alentaron mis padres es (RESP)",
    "Cuando me hablan de (RESP), pienso que cuanto más grande mejor",
    "Muchos disfrutan jugar con las consolas, pero a mi me gusta jugar con (RESP)",
    "En el living de mi casa, puse un cuadro con imagenes de (RESP)",
    "Después de una tarde llena de (RESP), me gusta tomarme un helado",
    "La semana pasa, me echaron de mi trabajo cuando se enteraron que me gusta (RESP)",
    "En mi trabajo soy conocido por (RESP)",
    "El record Guinness de este año, será una persona con (RESP)",
    "Lo que me gusta de las ferias es que puedo encontrar gran variedad y precio de (RESP)",
    "El cantante de mi banda musical favorita, tiene problemas con (RESP)",
    "El mejor método anticonceptivo es (RESP)"
];

//ANSWERS ----------------------------------------------------------------------------------------------------------------------------------------------------------------

const answers = [
    "Un pelo púbico de 30 cm",
    "Olor a viejo meado",
    "Hisopado anal",
    "Racismo",
    "Acariciar unos huevos sudados",
    "Esperar al matrimonio",
    "Un clítoris peludo",
    "Un pene de goma",
    "Viejos pedófilos",
    "Impotencia",
    "Un libro con bromas sobre el Holocausto",
    "Un judío cobrando entrada para su Bar Mitzvah",
    "La comunidad gay",
    "Que una ola te lleve el traje de baño",
    "Un grupo de curas jugando con niños",
    "Que te entre arena en la vagina",
    "Un campeonato de pedos suspendido por cancha embarrada",
    "Embocarle al frasco de examen del hospital",
    "Tener amigos homosexuales",
    "Practicar un aborto usando una percha",
    "La Sagrada Biblia",
    "Despertarse desnudo en una iglesia",
    "Un condón que me queda enorme",
    "Condones con sabor a atún",
    "Abstinencia de 8 años",
    "Los Nazis",
    "Dilatador anal",
    "Un aumento de pechos asimétrico",
    "Sexo anal en seco",
    "Pezones peludos",
    "Comer hasta vomitar",
    "Mi piercing en la punta del pene",
    "Ir a cagar y tapar el baño",
    "Pedofilia",
    "Cosquillas en el ano con un bigote",
    "Curar la homosexualidad con la palabra de la Iglesia",
    "Los hippies",
    "El Ku Klux Klan",
    "La lluvia dorada",
    "Un lavado intestinal usando la manguera del jardín de casa",
    "Mi colección de juguetes sexuales",
    "Necrofilia",
    "Tu madre dando latigazos",
    "Testículos peludos",
    "Masturbarse mientras cagas",
    "Domingos con incesto",
    "La sangre de Cristo",
    "Una pastilla de viagra vencida",
    "Ser rico",
    "Fantasías sexuales con leñadores",
    "El big bang",
    "Pensar en la esclavitud",
    "Dos enanos jugando al basketball",
    "Rascarse el culo en el shopping sin que te vean",
    "Blanqueamiento anal sin costo",
    "El Papa haciendo un paro de mano",
    "El pene de un amigo",
    "Mi vida sexual",
    "Que te manden un audio de 10 minutos",
    "Gente que huele sus medias antes de lavarlas",
    "Un borracho andando en monopatín",
    "Un poster del niño Jesús",
    "Herpes labial",
    "Herpes genital",
    "Ver dos perros abotonados",
    "Gente pobre",
    "Ir a cagar y quedarte sin papel",
    "Muestras gratuitas",
    "Mandarse una linea de merca",
    "Una erección que dura más de 5 horas",
    "Síndrome de colon irritable",
    "Raparle la cabeza a un amigo mientras duerme",
    "Tocarle el culo a un amigo",
    "Robarse los jabones del hotel",
    "Robarle la novia a tu amigo",
    "Vivir rodeado de pelotudos",
    "Sexo oral no recíproco",
    "Jugar una carrera con sillas de ruedas",
    "Una palanca de cambio con forma de pene",
    "Ver a mis padres teniendo sexo",
    "Condones defectuosos",
    "Un vibrador sin pilas",
    "Depilarse la axila con los dientes",
    "Perder la virginidad a los 40",
    "Exámen de próstata sin usar las manos",
    "Tener un hijo con 15 años",
    "Un niño muerto",
    "Pisar caca en la calle",
    "Un ateo gay",
    "Un judío católico",
    "Una bicicleta con asiento de pene",
    "Entrar a un baño y ver una frenada en el inodoro",
    "Un pedo con sorpresa en medio de un examen",
    "Un pepino con olor a caca",
    "Un pene finito y corto",
    "Un par de tetas bizcas",
    "Cinturón de castidad",
    "Creer en el horóscopo",
    "Un frasquito con lágrimas de semen de caballo",
    "Veganos con colesterol alto",
    "Comprar un esclavo y liberarlo",
    "Rebajas en condones usados",
    "Dos mancos pegándose cachetadas",
    "Gente que se huele los dedos",
    "Sadomasoquismo",
    "Dejar las sábanas llenas de caca",
    "Un perro lamiéndose el culo",
    "Lamerse el culo sin ayuda",
    "Depilarse el bello púbico con un Tramontina",
    "Calentarte con un micropene",
    "Un beso negro embarrado",
    "Usar un jabón con pelos pegados",
    "Entrar al baño descalzo y sentir el piso mojado",
    "Que te toquen timbre los testigos de Jehova",
    "Que te hagan la tira de cola con los dientes",
    "Cambiarle los pañales a un viejo",
    "Explicarle a los Testigos de Jehova que sos ateo",
    "Ser homofóbico",
    "Cagar mientras haces un paro de mano",
    "Tomar el meo matutino",
    "Test de embarazo positivo",
    "Un pedo vaginal de 30 segundos",
    "Ser empleado público",
    "Una teta flácida",
    "Dos niños de 8 años",
    "Comer carne en Semana Santa",
    "Recuerdos reprimidos",
    "Salir con alguien que estuvo preso",
    "Un boliviano vendiendo artesanías",
    "30% de descuento en tu segunda circuncisión",
    "Parir en el baño",
    "Un enano llamado Ricardo",
    "Que te de vértigo en la cola",
    "Mi entrepierna después de salir a correr",
    "Dar un like sin querer",
    "Un velorio con canilla libre de cerveza",
    "Un olor a transpiración insoportable",
    "Una mancha de caca que traspasa el pantalón",
    "Usar medias con sandalias para una cita",
    "Ir a cagar y que no haya papel",
    "Manuales en chino",
    "Una media mojada",
    "Pelos en los dedos de los pies",
    "El vecino que toca la batería hasta las 3 de la mañana",
    "Olor a perro mojado",
    "Sexo gratis",
    "Que tu cita tenga sorpresa",
    "Orgías con enanos disfrazados",
    "Acabar en menos de 1 minuto",
    "No llegar al orgasmo",
    "Una vagina con el diámetro de una olla",
    "Una media acartonada",
    "Bañarse una vez a la semana",
    "Dar vuelta la ropa interior para no lavarla",
    "Un grano en el medio del culo",
    "Darse el dedo pequeño del pie contra un mueble",
    "Aliento con olor a caño",
    "Hemorroides del tamaño de una manzana",
    "Empanadas de carne sospechosas",
    "Una mancha marrón en el borde del inodoro",
    "Una vaca carnívora",
    "Pedir monedas en la calle",
    "Una sesión de masajes en el escroto",
    "La caca tibia de mi perro al levantarla",
    "Una muñeca inflable pinchada",
    "Hacerle guiños a las monjas",
    "Creer que la tierra es plana",
    "Placer incomparable",
    "Mirar Dora la exploradora antes de ir a dormir",
    "Un gemido comparable con el llamado de un lobo marino",
    "Un vaso de Whisky caliente",
    "Cerveza sin alcohol",
    "La posición de misionero",
    "Un pedo en el ascensor",
    "Enviarle por error videos porno a mis suegros",
    "Dolor de huevos",
    "Tocarle el culo a las viejas",
    "Poner la dentadura en un vaso",
    "Hacer fila para ir al baño",
    "Estornudar por el culo",
    "Gritar un gemido en el medio de un velorio",
    "Armar rondas de chistes en medio de un velorio",
    "Tirar el jabón en la ducha",
    "Cosquillas en la entrepierna",
    "Mi desgarre anal causado por una semana de estreñimiento",
    "Cupones de descuento en viagra",
    "Mi vagina seca",
    "El hijo de mi vecino",
    "La infidelidad",
    "Casarse 9 veces",
    "Tener caca de paloma en el pelo",
    "Fumar marihuana",
    "Las tetas de mi amiga",
    "Una lengua larga y juguetona",
    "Que te quede olor a culo en la frente por hacer un 69",
    "Una documental para niños sobre el Hentai",
    "Conseguir la contraseña del wifi de mi vecino",
    "Arena para gato",
    "Meterse un racimo de uvas en el culo",
    "La mucama"
]