import { createClient } from "@libsql/client";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "verbs.db").replace(/\\/g, "/");

interface VerbSeed {
  infinitive: string;
  slug: string;
  type: string;
  conjugation_group: string;
  has_stem_change?: boolean;
  stem_change?: string;
  translation_en?: string;
  translation_ca?: string;
  translation_es?: string;
  frequency_rank?: number;
}

const EXAMPLE_SENTENCES: Record<string, Array<{ tense: string; person: string; sentence: string; translation_en: string }>> = {
  hablar: [
    { tense: "presente", person: "yo", sentence: "Yo hablo español con mis amigos.", translation_en: "I speak Spanish with my friends." },
    { tense: "preterito_indefinido", person: "él", sentence: "Ella habló con el director ayer.", translation_en: "She spoke with the director yesterday." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Hablaremos sobre el tema mañana.", translation_en: "We will talk about the topic tomorrow." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "De niño, hablaba mucho en clase.", translation_en: "As a child, I used to talk a lot in class." },
    { tense: "subjuntivo_presente", person: "él", sentence: "Espero que hable más despacio.", translation_en: "I hope he speaks more slowly." },
  ],
  ser: [
    { tense: "presente", person: "yo", sentence: "Soy estudiante de medicina.", translation_en: "I am a medical student." },
    { tense: "preterito_indefinido", person: "él", sentence: "Fue una tarde increíble.", translation_en: "It was an incredible afternoon." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Seremos los primeros en llegar.", translation_en: "We will be the first to arrive." },
    { tense: "preterito_imperfecto", person: "él", sentence: "Cuando era pequeño, era muy tímido.", translation_en: "When he was young, he was very shy." },
    { tense: "subjuntivo_presente", person: "tú", sentence: "Es importante que seas puntual.", translation_en: "It is important that you be on time." },
  ],
  estar: [
    { tense: "presente", person: "yo", sentence: "Estoy muy cansado hoy.", translation_en: "I am very tired today." },
    { tense: "preterito_indefinido", person: "él", sentence: "Estuvo en Madrid toda la semana.", translation_en: "He was in Madrid all week." },
    { tense: "preterito_imperfecto", person: "nosotros", sentence: "Estábamos esperando el autobús.", translation_en: "We were waiting for the bus." },
    { tense: "futuro_simple", person: "yo", sentence: "Estaré en casa a las ocho.", translation_en: "I will be home at eight." },
    { tense: "subjuntivo_presente", person: "él", sentence: "Quiero que estés tranquilo.", translation_en: "I want you to be calm." },
  ],
  tener: [
    { tense: "presente", person: "yo", sentence: "Tengo dos hermanos mayores.", translation_en: "I have two older brothers." },
    { tense: "preterito_indefinido", person: "él", sentence: "Tuvo mucha suerte en el examen.", translation_en: "He had a lot of luck in the exam." },
    { tense: "futuro_simple", person: "yo", sentence: "Tendré que estudiar más.", translation_en: "I will have to study more." },
    { tense: "preterito_imperfecto", person: "nosotros", sentence: "Teníamos mucho trabajo ese mes.", translation_en: "We had a lot of work that month." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Ten paciencia, ya llegará.", translation_en: "Be patient, it will come." },
  ],
  hacer: [
    { tense: "presente", person: "yo", sentence: "Hago ejercicio todas las mañanas.", translation_en: "I exercise every morning." },
    { tense: "preterito_indefinido", person: "él", sentence: "Hizo la tarea a tiempo.", translation_en: "He did the homework on time." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Haremos una fiesta el viernes.", translation_en: "We will have a party on Friday." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Hacía frío cuando salí de casa.", translation_en: "It was cold when I left home." },
    { tense: "subjuntivo_presente", person: "él", sentence: "Espero que haga buen tiempo mañana.", translation_en: "I hope the weather is nice tomorrow." },
  ],
  poder: [
    { tense: "presente", person: "yo", sentence: "No puedo dormir con tanto ruido.", translation_en: "I cannot sleep with so much noise." },
    { tense: "preterito_indefinido", person: "nosotros", sentence: "No pudimos llegar a tiempo.", translation_en: "We could not arrive on time." },
    { tense: "futuro_simple", person: "yo", sentence: "Podré ayudarte mañana por la tarde.", translation_en: "I will be able to help you tomorrow afternoon." },
    { tense: "preterito_imperfecto", person: "él", sentence: "Cuando era joven, podía correr muy rápido.", translation_en: "When he was young, he could run very fast." },
    { tense: "condicional_simple", person: "yo", sentence: "Podría venir si me avisas con tiempo.", translation_en: "I could come if you let me know in advance." },
  ],
  decir: [
    { tense: "presente", person: "él", sentence: "Dice que llegará tarde a la reunión.", translation_en: "He says he will be late to the meeting." },
    { tense: "preterito_indefinido", person: "yo", sentence: "Le dije la verdad sin rodeos.", translation_en: "I told him the truth directly." },
    { tense: "futuro_simple", person: "yo", sentence: "Te diré todo lo que sé.", translation_en: "I will tell you everything I know." },
    { tense: "preterito_imperfecto", person: "ellos", sentence: "Decían que el proyecto era imposible.", translation_en: "They used to say the project was impossible." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Di la verdad siempre.", translation_en: "Always tell the truth." },
  ],
  ir: [
    { tense: "presente", person: "nosotros", sentence: "Vamos al mercado los sábados.", translation_en: "We go to the market on Saturdays." },
    { tense: "preterito_indefinido", person: "yo", sentence: "Fui al médico la semana pasada.", translation_en: "I went to the doctor last week." },
    { tense: "futuro_simple", person: "ellos", sentence: "Irán de vacaciones en agosto.", translation_en: "They will go on vacation in August." },
    { tense: "preterito_imperfecto", person: "nosotros", sentence: "Íbamos a la playa cada verano.", translation_en: "We used to go to the beach every summer." },
    { tense: "subjuntivo_presente", person: "tú", sentence: "Quiero que vayas al supermercado.", translation_en: "I want you to go to the supermarket." },
  ],
  ver: [
    { tense: "presente", person: "yo", sentence: "Veo las noticias cada noche.", translation_en: "I watch the news every night." },
    { tense: "preterito_indefinido", person: "nosotros", sentence: "Vimos una película estupenda anoche.", translation_en: "We saw a great film last night." },
    { tense: "futuro_simple", person: "yo", sentence: "Veré ese documental este fin de semana.", translation_en: "I will watch that documentary this weekend." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Antes veía mucho la televisión.", translation_en: "I used to watch a lot of television." },
    { tense: "subjuntivo_presente", person: "él", sentence: "Cuando veas el resultado, te sorprenderás.", translation_en: "When you see the result, you will be surprised." },
  ],
  dar: [
    { tense: "presente", person: "yo", sentence: "Le doy las gracias por su ayuda.", translation_en: "I thank him for his help." },
    { tense: "preterito_indefinido", person: "ella", sentence: "Me dio un consejo muy útil.", translation_en: "She gave me a very useful piece of advice." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Daremos una charla sobre el tema.", translation_en: "We will give a talk on the subject." },
    { tense: "preterito_imperfecto", person: "él", sentence: "Le daba de comer al perro cada mañana.", translation_en: "He used to feed the dog every morning." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Dame tu número de teléfono.", translation_en: "Give me your phone number." },
  ],
  saber: [
    { tense: "presente", person: "yo", sentence: "Sé cocinar varios platos italianos.", translation_en: "I know how to cook several Italian dishes." },
    { tense: "preterito_indefinido", person: "nosotros", sentence: "Supimos la noticia por la radio.", translation_en: "We found out the news on the radio." },
    { tense: "futuro_simple", person: "él", sentence: "Sabrá la respuesta cuando estudie más.", translation_en: "He will know the answer when he studies more." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "No sabía que vivías en esta ciudad.", translation_en: "I did not know you lived in this city." },
    { tense: "condicional_simple", person: "yo", sentence: "¿Sabrías cómo llegar sin GPS?", translation_en: "Would you know how to get there without GPS?" },
  ],
  querer: [
    { tense: "presente", person: "yo", sentence: "Quiero aprender a tocar la guitarra.", translation_en: "I want to learn to play the guitar." },
    { tense: "preterito_indefinido", person: "ella", sentence: "Quiso hablar conmigo pero no pude.", translation_en: "She tried to speak with me but I couldn't." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Querremos más información antes de decidir.", translation_en: "We will want more information before deciding." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "De joven quería ser astronauta.", translation_en: "As a young person I wanted to be an astronaut." },
    { tense: "condicional_simple", person: "yo", sentence: "Querría un café con leche, por favor.", translation_en: "I would like a coffee with milk, please." },
  ],
  llegar: [
    { tense: "presente", person: "yo", sentence: "Llego siempre puntual al trabajo.", translation_en: "I always arrive on time to work." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Llegaron al aeropuerto con tiempo justo.", translation_en: "They arrived at the airport just in time." },
    { tense: "futuro_simple", person: "él", sentence: "Llegará a casa antes de la cena.", translation_en: "He will arrive home before dinner." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Siempre llegaba tarde a las clases.", translation_en: "I was always late to classes." },
    { tense: "subjuntivo_presente", person: "él", sentence: "Cuando llegues, llámame.", translation_en: "When you arrive, call me." },
  ],
  poner: [
    { tense: "presente", person: "yo", sentence: "Pongo la mesa antes de cenar.", translation_en: "I set the table before dinner." },
    { tense: "preterito_indefinido", person: "ella", sentence: "Puso el libro sobre la mesa.", translation_en: "She put the book on the table." },
    { tense: "futuro_simple", person: "yo", sentence: "Pondré las flores en el jarrón.", translation_en: "I will put the flowers in the vase." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Pon el abrigo en la percha.", translation_en: "Put your coat on the hook." },
    { tense: "preterito_imperfecto", person: "nosotros", sentence: "Poníamos la radio mientras desayunábamos.", translation_en: "We used to put the radio on while having breakfast." },
  ],
  venir: [
    { tense: "presente", person: "él", sentence: "Viene a visitarnos cada domingo.", translation_en: "He comes to visit us every Sunday." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Vinieron de lejos para asistir a la boda.", translation_en: "They came from far away to attend the wedding." },
    { tense: "futuro_simple", person: "yo", sentence: "Vendré en cuanto termine el trabajo.", translation_en: "I will come as soon as I finish work." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Ven aquí un momento, por favor.", translation_en: "Come here for a moment, please." },
    { tense: "preterito_imperfecto", person: "él", sentence: "Venía a verme cada semana.", translation_en: "He used to come to see me every week." },
  ],
  salir: [
    { tense: "presente", person: "yo", sentence: "Salgo a correr todos los días.", translation_en: "I go out for a run every day." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Salieron de la reunión muy tarde.", translation_en: "They left the meeting very late." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Saldremos de viaje el próximo lunes.", translation_en: "We will leave on a trip next Monday." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Sal de ahí enseguida.", translation_en: "Get out of there right away." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Salía con mis amigos los viernes.", translation_en: "I used to go out with my friends on Fridays." },
  ],
  volver: [
    { tense: "presente", person: "él", sentence: "Vuelve a casa muy tarde cada noche.", translation_en: "He comes home very late every night." },
    { tense: "preterito_indefinido", person: "yo", sentence: "Volví de vacaciones con mucha energía.", translation_en: "I came back from vacation with a lot of energy." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Volveremos a vernos pronto.", translation_en: "We will see each other again soon." },
    { tense: "preterito_imperfecto", person: "ella", sentence: "Volvía siempre a pie desde la oficina.", translation_en: "She always used to walk back from the office." },
    { tense: "subjuntivo_presente", person: "él", sentence: "Cuando vuelva, hablaremos del asunto.", translation_en: "When he comes back, we will discuss the matter." },
  ],
  vivir: [
    { tense: "presente", person: "yo", sentence: "Vivo en un piso pequeño en el centro.", translation_en: "I live in a small flat in the city centre." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Vivieron en París durante tres años.", translation_en: "They lived in Paris for three years." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Viviremos en el campo cuando nos jubilemos.", translation_en: "We will live in the countryside when we retire." },
    { tense: "preterito_imperfecto", person: "él", sentence: "Vivía en una casa grande con jardín.", translation_en: "He used to live in a large house with a garden." },
    { tense: "subjuntivo_presente", person: "tú", sentence: "Espero que vivas muy feliz allí.", translation_en: "I hope you live very happily there." },
  ],
  pensar: [
    { tense: "presente", person: "yo", sentence: "Pienso que debemos intentarlo.", translation_en: "I think we should try it." },
    { tense: "preterito_indefinido", person: "él", sentence: "Pensó mucho antes de responder.", translation_en: "He thought carefully before answering." },
    { tense: "futuro_simple", person: "yo", sentence: "Pensaré en tu propuesta con calma.", translation_en: "I will think about your proposal calmly." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Pensaba que todo sería más fácil.", translation_en: "I thought everything would be easier." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Piensa bien lo que vas a decir.", translation_en: "Think carefully about what you are going to say." },
  ],
  llevar: [
    { tense: "presente", person: "él", sentence: "Lleva corbata todos los días en la oficina.", translation_en: "He wears a tie to the office every day." },
    { tense: "preterito_indefinido", person: "yo", sentence: "Llevé a los niños al parque ayer.", translation_en: "I took the children to the park yesterday." },
    { tense: "futuro_simple", person: "ella", sentence: "Llevará el coche al taller mañana.", translation_en: "She will take the car to the garage tomorrow." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Siempre llevaba el paraguas por si acaso.", translation_en: "I always used to carry my umbrella just in case." },
  ],
  encontrar: [
    { tense: "presente", person: "yo", sentence: "Encuentro interesante aprender idiomas.", translation_en: "I find learning languages interesting." },
    { tense: "preterito_indefinido", person: "ella", sentence: "Encontró trabajo en una empresa internacional.", translation_en: "She found a job at an international company." },
    { tense: "futuro_simple", person: "tú", sentence: "Encontrarás las llaves en el cajón.", translation_en: "You will find the keys in the drawer." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "No encontraba las palabras para explicarlo.", translation_en: "I could not find the words to explain it." },
  ],
  conocer: [
    { tense: "presente", person: "yo", sentence: "Conozco a mucha gente en este barrio.", translation_en: "I know a lot of people in this neighbourhood." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Se conocieron en un congreso científico.", translation_en: "They met at a scientific conference." },
    { tense: "futuro_simple", person: "tú", sentence: "Conocerás a personas interesantes en el evento.", translation_en: "You will meet interesting people at the event." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "No lo conocía antes de ayer.", translation_en: "I did not know him before yesterday." },
    { tense: "subjuntivo_presente", person: "tú", sentence: "Cuando la conozcas, te caerá bien.", translation_en: "When you meet her, you will like her." },
  ],
  sentir: [
    { tense: "presente", person: "yo", sentence: "Siento un gran alivio al acabar el proyecto.", translation_en: "I feel a great sense of relief at finishing the project." },
    { tense: "preterito_indefinido", person: "él", sentence: "Sintió mucho no poder asistir a la boda.", translation_en: "He was very sorry not to be able to attend the wedding." },
    { tense: "futuro_simple", person: "tú", sentence: "Sentirás orgullo cuando lo logres.", translation_en: "You will feel proud when you achieve it." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Me sentía muy nervioso antes del examen.", translation_en: "I felt very nervous before the exam." },
  ],
  escribir: [
    { tense: "presente", person: "yo", sentence: "Escribo en mi diario cada noche.", translation_en: "I write in my diary every night." },
    { tense: "preterito_indefinido", person: "ella", sentence: "Escribió una carta de agradecimiento.", translation_en: "She wrote a thank-you letter." },
    { tense: "futuro_simple", person: "yo", sentence: "Escribiré el informe antes del viernes.", translation_en: "I will write the report before Friday." },
    { tense: "preterito_imperfecto", person: "él", sentence: "Escribía poemas cuando era adolescente.", translation_en: "He used to write poems when he was a teenager." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Escribe tu nombre completo en el formulario.", translation_en: "Write your full name on the form." },
  ],
  trabajar: [
    { tense: "presente", person: "yo", sentence: "Trabajo desde casa tres días a la semana.", translation_en: "I work from home three days a week." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Trabajaron toda la noche para cumplir el plazo.", translation_en: "They worked all night to meet the deadline." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Trabajaremos juntos en el nuevo proyecto.", translation_en: "We will work together on the new project." },
    { tense: "preterito_imperfecto", person: "ella", sentence: "Trabajaba en un hospital cuando la conocí.", translation_en: "She was working at a hospital when I met her." },
  ],
  buscar: [
    { tense: "presente", person: "yo", sentence: "Busco un apartamento cerca del trabajo.", translation_en: "I am looking for a flat near work." },
    { tense: "preterito_indefinido", person: "él", sentence: "Buscó la información en internet.", translation_en: "He looked up the information on the internet." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Buscaremos otra solución al problema.", translation_en: "We will look for another solution to the problem." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Buscaba trabajo desde hacía meses.", translation_en: "I had been looking for work for months." },
  ],
  esperar: [
    { tense: "presente", person: "yo", sentence: "Espero tu llamada con impaciencia.", translation_en: "I am eagerly waiting for your call." },
    { tense: "preterito_indefinido", person: "nosotros", sentence: "Esperamos más de dos horas en la cola.", translation_en: "We waited for more than two hours in the queue." },
    { tense: "futuro_simple", person: "yo", sentence: "Esperaré aquí hasta que llegues.", translation_en: "I will wait here until you arrive." },
    { tense: "preterito_imperfecto", person: "él", sentence: "Esperaba noticias con mucha ansiedad.", translation_en: "He was waiting for news with great anxiety." },
    { tense: "subjuntivo_presente", person: "él", sentence: "Espero que todo salga bien.", translation_en: "I hope everything goes well." },
  ],
  perder: [
    { tense: "presente", person: "yo", sentence: "Pierdo las llaves constantemente.", translation_en: "I constantly lose my keys." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Perdieron el partido en el último minuto.", translation_en: "They lost the match in the last minute." },
    { tense: "futuro_simple", person: "nosotros", sentence: "No perderemos más el tiempo.", translation_en: "We will not waste any more time." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Perdía mucho tiempo en el transporte.", translation_en: "I used to lose a lot of time commuting." },
  ],
  entender: [
    { tense: "presente", person: "yo", sentence: "Entiendo perfectamente lo que quieres decir.", translation_en: "I perfectly understand what you mean." },
    { tense: "preterito_indefinido", person: "él", sentence: "Entendió la explicación a la primera.", translation_en: "He understood the explanation straight away." },
    { tense: "futuro_simple", person: "tú", sentence: "Entenderás mejor cuando tengas más experiencia.", translation_en: "You will understand better when you have more experience." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "No entendía por qué estaba enfadada.", translation_en: "I did not understand why she was angry." },
    { tense: "subjuntivo_presente", person: "él", sentence: "Habla despacio para que lo entiendan todos.", translation_en: "Speak slowly so that everyone understands." },
  ],
  pedir: [
    { tense: "presente", person: "yo", sentence: "Pido siempre el mismo plato en este restaurante.", translation_en: "I always order the same dish at this restaurant." },
    { tense: "preterito_indefinido", person: "ella", sentence: "Pidió ayuda a sus compañeros.", translation_en: "She asked her colleagues for help." },
    { tense: "futuro_simple", person: "yo", sentence: "Pediré un aumento de sueldo el próximo mes.", translation_en: "I will ask for a pay rise next month." },
    { tense: "preterito_imperfecto", person: "él", sentence: "Pedía permiso antes de salir.", translation_en: "He used to ask for permission before leaving." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Pide lo que necesites sin vergüenza.", translation_en: "Ask for what you need without embarrassment." },
  ],
  recordar: [
    { tense: "presente", person: "yo", sentence: "Recuerdo perfectamente ese día.", translation_en: "I remember that day perfectly." },
    { tense: "preterito_indefinido", person: "ella", sentence: "Le recordó que tenía una cita.", translation_en: "She reminded him that he had an appointment." },
    { tense: "futuro_simple", person: "yo", sentence: "Recordaré este momento toda la vida.", translation_en: "I will remember this moment all my life." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "No recordaba dónde había aparcado el coche.", translation_en: "I did not remember where I had parked the car." },
  ],
  empezar: [
    { tense: "presente", person: "yo", sentence: "Empiezo a trabajar a las ocho.", translation_en: "I start work at eight o'clock." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Empezaron el proyecto el mes pasado.", translation_en: "They started the project last month." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Empezaremos las clases en septiembre.", translation_en: "We will start classes in September." },
    { tense: "preterito_imperfecto", person: "él", sentence: "Empezaba a llover cuando salí.", translation_en: "It was starting to rain when I left." },
  ],
  mirar: [
    { tense: "presente", person: "yo", sentence: "Miro el cielo y veo nubes oscuras.", translation_en: "I look at the sky and see dark clouds." },
    { tense: "preterito_indefinido", person: "ella", sentence: "Miró el reloj y vio que llegaba tarde.", translation_en: "She looked at her watch and saw she was running late." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Miraremos los resultados mañana.", translation_en: "We will look at the results tomorrow." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Mira antes de cruzar la calle.", translation_en: "Look before crossing the street." },
  ],
  pasar: [
    { tense: "presente", person: "yo", sentence: "Paso mucho tiempo leyendo libros.", translation_en: "I spend a lot of time reading books." },
    { tense: "preterito_indefinido", person: "él", sentence: "¿Qué pasó en la reunión de ayer?", translation_en: "What happened at yesterday's meeting?" },
    { tense: "futuro_simple", person: "yo", sentence: "Pasaré por tu casa mañana por la mañana.", translation_en: "I will stop by your house tomorrow morning." },
    { tense: "preterito_imperfecto", person: "nosotros", sentence: "Pasábamos los veranos en la playa.", translation_en: "We used to spend summers at the beach." },
  ],
  tomar: [
    { tense: "presente", person: "yo", sentence: "Tomo un café con leche cada mañana.", translation_en: "I have a white coffee every morning." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Tomaron una decisión difícil.", translation_en: "They made a difficult decision." },
    { tense: "futuro_simple", person: "yo", sentence: "Tomaré el autobús de las nueve.", translation_en: "I will take the nine o'clock bus." },
    { tense: "imperativo_afirmativo", person: "tú", sentence: "Toma este paraguas por si llueve.", translation_en: "Take this umbrella in case it rains." },
  ],
  quedar: [
    { tense: "presente", person: "yo", sentence: "Me quedo en casa esta tarde.", translation_en: "I am staying at home this afternoon." },
    { tense: "preterito_indefinido", person: "ellos", sentence: "Quedaron para tomar un café.", translation_en: "They arranged to meet for a coffee." },
    { tense: "futuro_simple", person: "nosotros", sentence: "Quedaremos en la plaza a las siete.", translation_en: "We will meet in the square at seven." },
    { tense: "preterito_imperfecto", person: "yo", sentence: "Quedaba con ella cada semana para estudiar.", translation_en: "I used to meet with her every week to study." },
  ],
};

async function initDb() {
  if (!fs.existsSync(path.join(process.cwd(), "data"))) {
    fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
  }

  const url = process.env.DATABASE_URL ?? `file:${DB_PATH}`;
  const client = createClient({
    url,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  await client.batch(
    [
      {
        sql: `CREATE TABLE IF NOT EXISTS verbs (
          id                INTEGER PRIMARY KEY,
          infinitive        TEXT NOT NULL,
          slug              TEXT NOT NULL,
          lang              TEXT NOT NULL DEFAULT 'es',
          type              TEXT,
          conjugation_group TEXT,
          has_stem_change   BOOLEAN DEFAULT 0,
          stem_change       TEXT,
          translation_en    TEXT,
          translation_ca    TEXT,
          translation_es    TEXT,
          frequency_rank    INTEGER,
          created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(slug, lang)
        )`,
        args: [],
      },
      {
        sql: `CREATE TABLE IF NOT EXISTS conjugations (
          id           INTEGER PRIMARY KEY,
          verb_id      INTEGER REFERENCES verbs(id) ON DELETE CASCADE,
          mood         TEXT NOT NULL,
          tense        TEXT NOT NULL,
          person       TEXT NOT NULL,
          form         TEXT NOT NULL,
          is_irregular BOOLEAN DEFAULT 0
        )`,
        args: [],
      },
      {
        sql: `CREATE TABLE IF NOT EXISTS examples (
          id             INTEGER PRIMARY KEY,
          verb_id        INTEGER REFERENCES verbs(id) ON DELETE CASCADE,
          tense          TEXT,
          person         TEXT,
          sentence       TEXT NOT NULL,
          translation_en TEXT
        )`,
        args: [],
      },
      { sql: "CREATE INDEX IF NOT EXISTS idx_verbs_slug ON verbs(slug)", args: [] },
      { sql: "CREATE INDEX IF NOT EXISTS idx_conjugations_verb_tense ON conjugations(verb_id, tense)", args: [] },
      { sql: "CREATE INDEX IF NOT EXISTS idx_verbs_frequency ON verbs(frequency_rank)", args: [] },
      { sql: "CREATE INDEX IF NOT EXISTS idx_verbs_lang ON verbs(lang)", args: [] },
    ],
    "deferred"
  );

  // Add translation_es column idempotently (ignore error if already exists)
  try {
    await client.execute("ALTER TABLE verbs ADD COLUMN translation_es TEXT");
  } catch {
    // Column already exists — safe to ignore
  }

  async function seedVerbs(seedFile: string, verbLang: string) {
    const seedPath = path.join(process.cwd(), "data", "seed", seedFile);
    const verbs: VerbSeed[] = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
    const seen = new Set<string>();
    const stmts: { sql: string; args: (string | number | null)[] }[] = [];
    for (const verb of verbs) {
      if (seen.has(verb.slug)) continue;
      seen.add(verb.slug);
      stmts.push({
        sql: `INSERT OR IGNORE INTO verbs
              (infinitive, slug, lang, type, conjugation_group, has_stem_change, stem_change, translation_en, translation_ca, translation_es, frequency_rank)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          verb.infinitive,
          verb.slug,
          verbLang,
          verb.type ?? "regular",
          verb.conjugation_group,
          verb.has_stem_change ? 1 : 0,
          verb.stem_change ?? null,
          verb.translation_en ?? null,
          verb.translation_ca ?? null,
          verb.translation_es ?? null,
          verb.frequency_rank ?? null,
        ],
      });
    }
    for (let i = 0; i < stmts.length; i += 50) {
      await client.batch(stmts.slice(i, i + 50), "write");
    }
    return stmts.length;
  }

  const esCount = await seedVerbs("verbs-es.json", "es");
  const caCount = await seedVerbs("verbs-ca.json", "ca");
  const enCount = await seedVerbs("verbs-en.json", "en");
  console.log(`Seeded: ${esCount} ES verbs, ${caCount} CA verbs, ${enCount} EN verbs`);

  for (const [slug, examples] of Object.entries(EXAMPLE_SENTENCES)) {
    const verbResult = await client.execute({
      sql: "SELECT id FROM verbs WHERE slug = ? AND lang = 'es'",
      args: [slug],
    });
    if (!verbResult.rows[0]) continue;
    const verbId = verbResult.rows[0].id as number;

    // Always replace examples so re-running db:init picks up new sentences
    await client.execute({ sql: "DELETE FROM examples WHERE verb_id = ?", args: [verbId] });
    await client.batch(
      examples.map((ex) => ({
        sql: "INSERT INTO examples (verb_id, tense, person, sentence, translation_en) VALUES (?, ?, ?, ?, ?)",
        args: [verbId, ex.tense, ex.person, ex.sentence, ex.translation_en],
      })),
      "write"
    );
  }

  const countResult = await client.execute("SELECT COUNT(*) as c FROM verbs");
  const url_used = url.startsWith("file:") ? url : url.replace(/\/\/.*@/, "//***@");
  console.log(`Database initialized: ${url_used}`);
  console.log(`Total verbs in DB: ${countResult.rows[0].c}`);

  client.close();
}

initDb().catch((err) => {
  console.error(err);
  process.exit(1);
});
