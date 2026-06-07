export interface VerbRichContent {
  description: string;
  examples: Array<{ es: string }>;
  didYouKnow: string[];
}

const DATA: Record<string, VerbRichContent> = {
  ser: {
    description: `El verbo "ser" es uno de los pilares fundamentales del español. A diferencia del inglés, donde existe un único "to be", el español distingue entre ser y estar para expresar conceptos distintos. Ser se utiliza para describir características permanentes o inherentes de personas y cosas: identidad, nacionalidad, profesión, origen, características físicas estables y personalidad. "María es enfermera", "Soy de Madrid", "El libro es azul".

Desde el punto de vista gramatical, ser es uno de los verbos más irregulares del español. Sus formas en presente son completamente atípicas: soy, eres, es, somos, sois, son. En pretérito indefinido comparte formas con el verbo ir (fui, fuiste, fue, fuimos, fuisteis, fueron), lo que puede causar confusión inicial. El subjuntivo presente también es irregular: sea, seas, sea, seamos, seáis, sean.

Una de las reglas más importantes para dominar ser es entender cuándo no usarlo. Los estados temporales, las posiciones físicas y las emociones momentáneas requieren estar. Sin embargo, el mismo adjetivo puede cambiar de significado según se use con ser o estar: "ser aburrido" significa que la persona es aburrida por naturaleza, mientras que "estar aburrido" significa que está aburrida en este momento concreto.

Ser también construye la voz pasiva: "El libro fue escrito por García Márquez". Expresa hora y fecha: "Son las tres de la tarde", "El concierto es el viernes". Y sirve para identificar sujetos con predicados nominales: "El problema es el dinero", "Eso es lo que necesitamos".

Para los estudiantes de español, distinguir ser de estar es uno de los mayores desafíos, pero también el área que más recompensas da al dominarse, ya que permite comunicarse con una precisión que el inglés no puede expresar con un solo verbo.`,
    examples: [
      { es: "Soy profesora de matemáticas en un instituto público de Valencia desde hace diez años." },
      { es: "Mi abuelo era de Sevilla, pero lleva cuarenta años viviendo en Barcelona con su familia." },
      { es: "El concierto es el sábado por la noche en el teatro principal de la ciudad." },
      { es: "¿Eres tú quien me llamó esta mañana desde un número desconocido?" },
      { es: "La reunión fue muy productiva y terminamos todos los puntos antes de lo previsto." },
    ],
    didYouKnow: [
      `"Ser" y "estar" comparten raíces latinas distintas. "Ser" viene de "esse" y "sedere" (estar sentado), mientras que "estar" viene de "stare" (estar de pie). Por eso en el español medieval los usos de ambos verbos estaban menos diferenciados que hoy; la distinción moderna es resultado de siglos de evolución.`,
      `Las formas "soy", "estoy", "voy" y "doy" son las únicas en español con terminación en "-oy". Son reliquias de una antigua desinencia latina de primera persona que se conservó solo en estos cuatro verbos de uso altísimo (ser, estar, ir, dar). Esta rareza las convierte en las formas más difíciles de olvidar una vez aprendidas.`,
    ],
  },

  estar: {
    description: `El verbo "estar" es, junto con ser, uno de los dos pilares del español para expresar "to be" en inglés. Mientras que ser describe características permanentes o inherentes, estar indica estados temporales, posiciones, condiciones y emociones momentáneas. Dominar esta distinción es una de las señales más claras de dominio avanzado del idioma.

Estar se usa en cuatro grandes contextos: para indicar ubicación ("El supermercado está en la calle Mayor"), para expresar estados temporales ("Estoy muy cansado después del viaje"), para formar tiempos continuos con el gerundio ("Estoy comiendo"; "Estaba leyendo cuando llegaste"), y para expresar resultados de acciones ("La ventana está rota", "El pastel ya está listo").

Gramaticalmente, estar es irregular. En presente de indicativo: estoy, estás, está, estamos, estáis, están. La forma "estoy" presenta la terminación en "-oy" que comparte con soy, voy y doy. En pretérito indefinido también es irregular: estuve, estuviste, estuvo, estuvimos, estuvisteis, estuvieron.

Una de las trampas más comunes son los adjetivos que cambian de significado con ser o estar: "ser malo" describe a alguien cruel, "estar malo" significa estar enfermo; "ser listo" es ser inteligente, "estar listo" es estar preparado; "ser rico" es ser adinerado, "estar rico" significa que algo tiene buen sabor.

En el español coloquial, estar se usa constantemente: "¿Cómo estás?" como saludo, "Está bien" para dar aprobación, "estar en las nubes" para referirse a alguien despistado. En Latinoamérica, "estar" se emplea en algunos contextos donde en España se usaría ser: "Estoy casado desde hace diez años" es natural en toda Hispanoamérica. Estas variaciones regionales enriquecen el idioma.`,
    examples: [
      { es: "Estoy estudiando para el examen desde las seis de la mañana y todavía me quedan tres temas." },
      { es: "El médico me dijo que estoy bien de salud, aunque tengo que reducir el estrés laboral." },
      { es: "¿Sabes dónde está la farmacia más cercana? No conozco bien este barrio." },
      { es: "Cuando llegué a casa, mis hijos estaban durmiendo en el sofá con el televisor encendido." },
      { es: "Este arroz con leche está riquísimo; tienes que darme la receta de tu abuela." },
    ],
    didYouKnow: [
      `El "estar + gerundio" (forma progresiva) ganó terreno en español durante el siglo XX, en parte por influencia del inglés. El español clásico y literario prefería el presente simple incluso para acciones en curso: "¿Qué haces?" en lugar de "¿Qué estás haciendo?". La progresiva no es incorrecta, pero el presente simple es igualmente válido en español para acciones que ocurren ahora mismo.`,
      `En algunos países latinoamericanos, especialmente México y el Caribe, la expresión "¡Está bueno!" (equivalente a "¡De acuerdo!" o "¡Vale!") se usa como respuesta afirmativa coloquial. En España la misma construcción se usaría para elogiar la calidad de un alimento. Este mismo verbo, con el mismo adjetivo, tiene usos pragmáticos completamente distintos según el país.`,
    ],
  },

  haber: {
    description: `El verbo "haber" tiene una función lingüística única en español: es el auxiliar por excelencia, indispensable para formar todos los tiempos compuestos. Sin haber no existirían el pretérito perfecto ("he comido"), el pluscuamperfecto ("había estudiado"), el futuro compuesto ("habrá llegado") ni el condicional compuesto ("habría podido"). Su importancia gramatical es enorme, aunque muchos estudiantes lo descuidan en favor de verbos con significado más concreto.

En los tiempos compuestos, haber funciona como auxiliar y se combina con el participio del verbo principal. La regla es firme: el participio nunca concuerda en género ni número con el sujeto (a diferencia del francés o el italiano). "María ha comido tres platos", nunca "ha comidos".

Haber también tiene una función impersonal fundamental: indica existencia. Solo existe en tercera persona del singular: "hay" (presente), "había/hubo" (pasado), "habrá" (futuro). "Hay mucha gente en la plaza", "Había un problema con la factura", "No habrá clases mañana". Este uso impersonal es fuente frecuente de error: es incorrecto decir "han muchos problemas"; la forma correcta es siempre "hay muchos problemas".

En el presente de indicativo como auxiliar: he, has, ha, hemos, habéis, han. El pretérito indefinido es muy irregular: hube, hubiste, hubo, hubimos, hubisteis, hubieron (de uso escaso en la lengua oral, salvo en algunas variedades latinoamericanas). El imperfecto: había, habías, había, habíamos, habíais, habían.

"Haber de + infinitivo" es una construcción formal de obligación o probabilidad: "Has de saber que no es fácil" (debes saber), "Ha de ser el cartero" (probablemente es el cartero). Esta construcción es más frecuente en el español formal y literario que en la lengua coloquial cotidiana.`,
    examples: [
      { es: "He trabajado en esta empresa durante quince años y nunca me han faltado el respeto." },
      { es: "Cuando llegamos al aeropuerto, el avión ya había despegado hacía media hora." },
      { es: "Hay que tomar una decisión antes del viernes si queremos aprovechar la oferta." },
      { es: "Si hubiera sabido que venías, habría preparado algo especial para cenar." },
      { es: "Había tanta gente en el concierto que no podíamos movernos entre el público." },
    ],
    didYouKnow: [
      `El uso coloquial de "habemos" como "somos" ("habemos varios que pensamos lo mismo") es considerado incorrecto por la RAE, pero está muy extendido en México y otros países latinoamericanos. Su origen está en la confusión entre el uso impersonal de haber y los verbos ser/estar. Curiosamente, "habemos" sí es correcto como primera persona del plural de haber auxiliar: "Ya habemos comido todos".`,
      `En el español medieval, haber se usaba como verbo pleno con el significado de "poseer". Frases como "he miedo" (tengo miedo) o "ha tiempo" (hace tiempo) aparecen en obras como el Poema del Mío Cid. Hoy solo "tener" conserva ese significado posesivo, mientras que haber se especializó como auxiliar. Las demás lenguas romances, como el francés (avoir) o el italiano (avere), conservaron el mismo verbo para ambas funciones.`,
    ],
  },

  tener: {
    description: `El verbo "tener" es uno de los más versátiles y frecuentes del español. Su significado principal es "poseer o disponer de", pero en la práctica cotidiana su uso va mucho más allá. Tener expresa posesión ("Tengo dos hermanos"), edad ("Mi abuela tiene ochenta años"), estados físicos y emocionales ("Tengo hambre", "Tienes razón"), y obligación con la estructura "tener que + infinitivo" ("Tengo que salir temprano mañana").

Gramaticalmente, tener es irregular especialmente en el presente de indicativo: tengo, tienes, tiene, tenemos, tenéis, tienen. La primera persona "tengo" es especialmente irregular, con la -g- que no aparece en ninguna otra forma del presente. En futuro y condicional también es irregular: tendré, tendrás (futuro); tendría, tendrías (condicional). El pretérito indefinido es completamente irregular: tuve, tuviste, tuvo, tuvimos, tuvisteis, tuvieron.

La construcción "tener que + infinitivo" es una de las más productivas del español para expresar obligación o necesidad: "Tienes que descansar más", "Tendremos que hablar de esto", "¿Tiene que ser hoy?". A diferencia de "deber + infinitivo", que tiene un tono más moral o formal, "tener que" expresa una obligación más práctica o circunstancial.

Tener entra también en numerosas expresiones idiomáticas esenciales: "tener en cuenta" (to keep in mind), "tener ganas de" (to feel like), "no tener pelos en la lengua" (to be outspoken), "tener mucho que ver" (to have a lot to do with). En estructuras afectivas, "tener" expresa acciones completadas listas para usar: "Tengo escrita la carta" (The letter is written and ready) — más específico que "He escrito la carta".

Un punto importante: tener nunca debe confundirse con el auxiliar haber en los tiempos compuestos. "He comido" (auxiliar haber) es diferente de "Tengo comida" (tener + sustantivo). Los estudiantes que traducen directamente del inglés "I have" pueden mezclar estos dos usos.`,
    examples: [
      { es: "Tengo una reunión muy importante mañana a primera hora y estoy bastante nervioso." },
      { es: "¿Tienes tiempo para tomar un café antes de que empiece la clase de las cuatro?" },
      { es: "Mi hijo tiene doce años pero ya demuestra más responsabilidad que muchos adultos." },
      { es: "Tendríamos que haber salido antes; ahora llegaremos tarde al aeropuerto." },
      { es: "Tiene razón en lo que dice, pero la forma de decirlo podría haber sido mejor." },
    ],
    didYouKnow: [
      `La construcción "tener + participio" (como en "Tengo escrita la carta" o "Tiene estudiados todos los temas") es poco conocida pero muy expresiva. A diferencia del pretérito compuesto ("He escrito la carta"), enfatiza el resultado: la carta está lista, preparada para ser enviada. Esta construcción muestra que la acción se ha completado de forma acabada y el resultado está disponible.`,
      `El verbo "haber" tenía originalmente el significado de "tener/poseer" en el español medieval, y solo más tarde se especializó como auxiliar. El español optó por "tener" para la posesión, mientras que las lenguas romances como el francés (avoir) o el italiano (avere) conservaron el mismo verbo para ambas funciones. Esta bifurcación hace que el sistema verbal del español sea más preciso pero también más complejo.`,
    ],
  },

  hacer: {
    description: `El verbo "hacer" es imprescindible en español por la enorme variedad de contextos en que aparece. Su significado más básico es "realizar una acción" (hacer el trabajo, hacer los deberes, hacer ejercicio), pero también significa "crear o fabricar" (hacer una tarta, hacer una casa) y "causar" (hacer daño, hacer reír). Esta versatilidad lo convierte en uno de los verbos más frecuentes del idioma, cubriendo buena parte de los usos del inglés "to do" y "to make" en un solo verbo.

Gramaticalmente, hacer es irregular en varias formas clave. En presente de indicativo, la primera persona es irregular: hago. El imperativo informal es especialmente corto: haz. En futuro y condicional presenta raíz irregular: haré, harás; haría, harías. El pretérito indefinido es completamente irregular: hice, hiciste, hizo, hicimos, hicisteis, hicieron. La forma "hizo" cambia la "c" por "z" para mantener el sonido.

Una de las funciones más importantes de hacer es en las expresiones meteorológicas: "Hace frío", "Hace calor", "Hace viento", "Hace sol". En esta función, hacer es siempre impersonal (solo tercera persona del singular) sin sujeto explícito. También expresa tiempo transcurrido: "Hace dos horas que espero", "Hace tres años que vivo aquí". Esta función temporal es esencial y no tiene equivalente directo en inglés.

La expresión "hacer falta" (to be needed) es muy común: "Hace falta más tiempo", "No hace falta que vengas". Y "hacerse + adjetivo" expresa transformación: "hacerse mayor", "hacerse rico", "hacerse tarde". La diferencia entre "ser", "estar" y "hacerse" para los cambios de estado es uno de los matices más finos del español.

En el lenguaje coloquial, hacer aparece en incontables frases hechas: "hacer la vista gorda" (to turn a blind eye), "hacer las paces" (to make up), "hacerse el tonto" (to play dumb), "hacer buenas migas" (to get along well).`,
    examples: [
      { es: "Hago ejercicio cada mañana antes de ir al trabajo para despejar la mente y empezar bien el día." },
      { es: "Mi madre me hizo una tarta de cumpleaños con mis ingredientes favoritos de siempre." },
      { es: "Hace tres semanas que no sé nada de él; estoy empezando a preocuparme de verdad." },
      { es: "¿Qué harías tú en mi lugar si descubrieras algo tan sorprendente como eso?" },
      { es: "Hicimos las paces después de la discusión y ahora la relación está mejor que nunca." },
    ],
    didYouKnow: [
      `En el español medieval, la forma del pretérito indefinido era "fizo", no "hizo". El cambio de "f" inicial a "h" muda (que no se pronuncia) es una de las características más reconocibles que diferencia el español del portugués o el italiano, que conservaron la "f": hacer → fazer (portugués), fiz → hice. Esta transformación fonética ocurrió gradualmente entre los siglos XIII y XVII.`,
      `El verbo "hacer" puede sustituir a casi cualquier verbo en conversaciones coloquiales cuando el contexto es claro. "¿Has hecho los deberes?", "Hace falta que hables con ella", "Haz lo que puedas". Esta plasticidad semántica —la capacidad de hacer referencia vaga a cualquier acción— lo convierte junto con "tener" y "ser/estar" en el verbo más polivalente del español cotidiano.`,
    ],
  },

  poder: {
    description: `El verbo "poder" es uno de los verbos modales más importantes del español. Expresa capacidad o habilidad ("No puedo levantar esta caja, pesa demasiado"), posibilidad ("Puede que llueva mañana"), permiso ("¿Puedo sentarme aquí?"), y sugerencia o propuesta ("¿Podríamos quedar el martes?"). Esta multifuncionalidad lo convierte en un verbo esencial para cualquier tipo de comunicación en español.

Gramaticalmente, poder es irregular con cambio de raíz o→ue en las formas tónicas del presente: puedo, puedes, puede, podemos, podéis, pueden. Las formas "podemos" y "podéis" NO tienen cambio de raíz porque el acento no recae sobre ella. Esta es la regla del "verbo bota": el cambio solo afecta a las formas donde el acento cae sobre la raíz. El pretérito indefinido es completamente irregular: pude, pudiste, pudo, pudimos, pudisteis, pudieron. El futuro y condicional: podré, podrás; podría, podrías.

La diferencia entre "poder + infinitivo" y "saber + infinitivo" es clásica: "Puedo conducir" puede significar que tengo permiso (tengo carnet). "Sé conducir" significa que tengo la habilidad técnica. En el habla coloquial esta distinción se difumina frecuentemente, pero en contextos formales es importante mantenerla para ser preciso.

Las construcciones con poder más frecuentes incluyen: "poder con" (poder manejar algo: "No puedo con tanto trabajo"), "no poder más" (estar al límite: "Llevo ocho horas trabajando, ya no puedo más"), "¿se puede?" (frase hecha al llamar a una puerta antes de entrar), y "a más no poder" (al máximo: "Comimos a más no poder en la boda").

En el uso modal, poder en condicional ("podría") es muy frecuente para peticiones más corteses: "¿Podría hablar con el director?" suena más educado que "¿Puede hablar con el director?". Este uso del condicional para la cortesía es fundamental en situaciones formales.`,
    examples: [
      { es: "No puedo asistir a la reunión del jueves porque tengo cita con el médico a esa hora." },
      { es: "¿Puedes ayudarme a mover este armario? Es demasiado pesado para hacerlo sola." },
      { es: "Cuando era joven, podía correr diez kilómetros sin apenas cansarme." },
      { es: "Puede que tengas razón, pero necesito más tiempo para pensarlo con calma." },
      { es: "Si pudieras cambiar algo de tu pasado, ¿qué cambiarías exactamente?" },
    ],
    didYouKnow: [
      `La expresión "¿se puede?" que se usa al llamar a una puerta antes de entrar es casi exclusiva del español. No tiene equivalente directo en inglés, donde simplemente se llamaría o se diría "can I come in?". Esta fórmula de cortesía — pedir permiso antes de entrar en un espacio ajeno — refleja valores de respeto personal muy presentes en la cultura hispanohablante.`,
      `La expresión "a lo mejor" (perhaps/maybe) es un fósil lingüístico medieval. Proviene de la frase completa "a lo que mejor pudiere ser" (to what might be best), en la que "poder" desempeñaba un papel central. Con el tiempo se acortó y lexicalizó. Hoy nadie asocia "a lo mejor" con el verbo poder, pero etymológicamente lleva ese verbo incrustado.`,
    ],
  },

  querer: {
    description: `El verbo "querer" tiene dos significados fundamentales que en inglés se expresan con verbos distintos: "to want" (querer algo, querer hacer algo) y "to love" (querer a alguien). Esta dualidad raramente causa confusión en contexto, pero sí requiere que el hablante no nativo sea consciente de ella. "Quiero agua" significa "I want water", mientras que "Quiero a mi familia" significa "I love my family".

Gramaticalmente, querer es irregular con cambio de raíz e→ie en las formas tónicas del presente: quiero, quieres, quiere, queremos, queréis, quieren. El pretérito indefinido es completamente irregular: quise, quisiste, quiso, quisimos, quisisteis, quisieron. El futuro y condicional también tienen raíz irregular: querré, querrás; querría, querrías.

Una distinción importante es el uso de "querer" frente a "amar". En español, "querer" es el verbo más común para expresar amor entre personas cercanas — familia, amigos íntimos, pareja en el lenguaje cotidiano. "Amar" tiene un tono más intenso, poético o formal. En el habla cotidiana española, decirle "te quiero" a un amigo muy cercano o a un familiar es completamente normal, sin connotaciones necesariamente románticas.

La expresión "querer decir" es fundamental en el idioma: significa "to mean" y se usa constantemente. "¿Qué quieres decir con eso?", "No quiero decir que sea malo", "¿Qué quiso decir el autor con esta metáfora?". Esta expresión es esencial para la comunicación y la aclaración de malentendidos.

El condicional de querer ("querría") se usa para hacer peticiones corteses o expresar deseos formales: "Querría reservar una mesa para dos" es más educado que "Quiero reservar una mesa". Esta diferencia entre el presente directo y el condicional cortés es importante en contextos de servicio al cliente, restaurantes y situaciones formales.`,
    examples: [
      { es: "Quiero aprender a cocinar platos tradicionales porque echo mucho de menos la comida de mi madre." },
      { es: "¿Qué quieres decir con que el proyecto no va bien? Explícate, por favor." },
      { es: "Mis abuelos se quisieron mucho hasta el último día de sus vidas." },
      { es: "Si quisieras cambiar de trabajo, yo te ayudaría a preparar el currículum sin dudarlo." },
      { es: "Queremos visitar Granada este verano, especialmente la Alhambra y el barrio del Albaicín." },
    ],
    didYouKnow: [
      `En el español de España, "te quiero" entre amigos y familiares es completamente normal y frecuente. En algunos países latinoamericanos, "te quiero" se reserva más para relaciones románticas. Esta diferencia cultural puede causar malentendidos: un español diciéndole "te quiero" a un amigo latinoamericano podría provocar una reacción inesperada o confusa.`,
      `El refrán "quien bien te quiere te hará llorar" refleja una filosofía sobre el amor auténtico que exige honestidad aunque duela. La versión completa es "Quien bien te quiere te hará llorar; quien mal te quiere te hará reír", aludiendo a que la crítica verdadera nace del amor, no de la adulación. Esta idea de que el cariño genuino incluye la verdad incómoda está muy arraigada en la cultura hispana.`,
    ],
  },

  saber: {
    description: `El verbo "saber" tiene en español un campo semántico específico y diferente del verbo "conocer". La distinción entre saber y conocer es uno de los aspectos más delicados del español para hablantes de inglés u otras lenguas con un único verbo para "to know". Saber se usa para conocer información, hechos, datos, habilidades y procedimientos; mientras que conocer se usa para estar familiarizado con personas, lugares o cosas.

En términos prácticos: "Sé la respuesta" (dato concreto), "¿Sabes hablar chino?" (habilidad), "Sé que está en casa" (hecho). Por contraste: "Conozco a María" (familiar con una persona), "Conozco Madrid" (familiar con un lugar). La regla práctica: si después del verbo viene un infinitivo o una subordinada con "que", casi siempre se usa saber.

Gramaticalmente, saber es irregular solo en primera persona del presente: sé (yo). El resto del presente es regular: sabes, sabe, sabemos, sabéis, saben. El pretérito indefinido es completamente irregular: supe, supiste, supo, supimos, supisteis, supieron. El futuro y condicional también son irregulares: sabré, sabrás; sabría, sabrías.

"Saber a" (to taste like) es una expresión muy usada que muchos estudiantes no conocen: "Esto sabe a canela", "No sé a qué sabe", "Sabe a poco" (no es suficiente, se queda uno con ganas de más). Esta construcción es completamente diferente del inglés "to know" y es uno de los usos más creativos del verbo.

"¡Qué sé yo!" o "¡Yo qué sé!" son expresiones coloquiales muy frecuentes que equivalen a "I have no idea" o "how should I know?". También "que yo sepa" (as far as I know) es una forma de moderar una afirmación: "Que yo sepa, no hay ningún problema". Estas expresiones son fundamentales para sonar natural en el español oral.`,
    examples: [
      { es: "Sé hablar inglés con fluidez, pero siempre me cuesta más expresar emociones en otro idioma." },
      { es: "¿Sabes si el museo cierra los lunes? Quiero organizarme bien el viaje antes de reservar." },
      { es: "Supo la noticia del accidente cuando ya era demasiado tarde para hacer algo." },
      { es: "No sabemos qué hacer con esta situación; necesitamos consejo urgente de alguien de confianza." },
      { es: "Este gazpacho sabe exactamente igual que el que hacía mi abuela en los veranos de mi infancia." },
    ],
    didYouKnow: [
      `La exclamación "¡A saber!" es única del español y significa "¡Quién sabe!" o "¡Vaya uno a saber!". Es una forma de expresar incertidumbre o escepticismo. "¿Cuándo llegará el tren?" — "¡A saber!" Esta construcción usa el infinitivo de forma exclamativa, algo poco común en muchas lenguas, y muestra la capacidad del español para crear expresiones compactas con mucha carga pragmática.`,
      `El sustantivo "sabor" (flavor/taste) viene del mismo origen que "saber". La conexión se aprecia en expresiones como "saber a" (to taste like). En latín, "sapere" significaba tanto "conocer/saber" como "tener sabor/gusto", lo que explica por qué "sabio" (wise) y "sabroso" (tasty) tienen la misma raíz etimológica. También la palabra inglesa "sage" (salvia, hierba aromática, pero también "wise man") comparte este origen.`,
    ],
  },

  ir: {
    description: `El verbo "ir" es, sin duda, uno de los verbos más irregulares del español. Sus formas provienen de tres verbos latinos distintos (ire, vadere y esse), lo que explica la aparente falta de coherencia entre sus conjugaciones: las formas de presente (voy, vas, va) no tienen nada que ver con las del pretérito indefinido (fui, fuiste, fue), que a su vez son idénticas a las del verbo ser. Esta confluencia de raíces distintas hace que ir sea un verbo que hay que memorizar casi forma a forma.

En el presente de indicativo: voy, vas, va, vamos, vais, van. El gerundio es "yendo". En el pretérito indefinido comparte formas con ser: fui, fuiste, fue, fuimos, fuisteis, fueron. Esta coincidencia entre ir y ser en el pretérito puede causar ambigüedad temporal: "Fue al mercado" (He went to the market) y "Fue un gran día" (It was a great day) se distinguen únicamente por el contexto.

La perífrasis "ir a + infinitivo" es una de las más frecuentes del español y equivale al "going to" del inglés para expresar futuro próximo o planificado: "Voy a estudiar esta tarde", "¿Qué vas a hacer el fin de semana?", "Va a llover". Esta construcción es preferida en el habla cotidiana sobre el futuro simple para acciones cercanas o ya decididas.

"Irse" (forma reflexiva) tiene matices distintos: mientras que "ir" describe el movimiento hacia un destino, "irse" enfatiza la partida o el abandono del lugar actual: "Me voy" (I'm leaving), "Se fue sin decir nada" (He left without saying anything).

Las expresiones con ir son numerosas: "ir al grano" (to get to the point), "ir de mal en peor" (to go from bad to worse), "¿cómo te va?" (how's it going?), "ir a medias" (to split the bill), "¡vamos!" (let's go!/come on!). El imperativo "¡vamos!" es especialmente versátil: puede expresar urgencia, ánimo o escepticismo según el contexto y la entonación.`,
    examples: [
      { es: "Voy al gimnasio tres veces a la semana, aunque a veces me cuesta mucho motivarme para salir." },
      { es: "Mañana vamos a visitar a los abuelos y comer juntos toda la familia por primera vez en meses." },
      { es: "Fui al médico la semana pasada y me recetaron descanso absoluto durante cinco días." },
      { es: "¿A qué hora vas a llegar? Te espero en la cafetería que está enfrente del teatro municipal." },
      { es: "Se fue de la empresa sin avisar a nadie y todavía no sabemos qué pasó exactamente." },
    ],
    didYouKnow: [
      `Las formas del presente de ir (voy, vas, va...) vienen del verbo latino "vadere" (avanzar), mientras que las formas de pretérito (fui, fuiste...) vienen de "ire" (ir). Esta mezcla de dos verbos distintos en uno se llama "supletismo verbal" y es un fenómeno relativamente raro en las lenguas. También "ser" comparte el mismo pretérito (fui), lo que crea una coincidencia única en español: ir y ser tienen exactamente las mismas formas en pasado.`,
      `La palabra "vagabundo" y el verbo "vagar" tienen la misma raíz latina que "ir" (vadere). También "invadir" y "evasión" son parientes etimológicos. De la misma raíz viene la palabra inglesa "wade" (vadear un río), mostrando cómo las lenguas indoeuropeas, a pesar de haber evolucionado de formas muy distintas durante siglos, siguen compartiendo ancestros comunes visibles cuando se buscan.`,
    ],
  },

  venir: {
    description: `El verbo "venir" es el compañero natural de ir. Mientras que ir expresa movimiento alejándose del hablante o hacia un destino específico, venir expresa movimiento hacia el hablante o hacia el lugar donde está el hablante. Esta distinción deíctica (basada en la posición del hablante) es fundamental y a veces difícil de dominar para hablantes de inglés, que tiene menos restricciones sobre el uso de "come" y "go".

Gramaticalmente, venir es muy irregular. En el presente de indicativo: vengo, vienes, viene, venimos, venís, vienen. La forma "vengo" tiene la -g- característica de varios verbos del presente (tener→tengo, poner→pongo, hacer→hago, salir→salgo). El pretérito indefinido es completamente irregular: vine, viniste, vino, vinimos, vinisteis, vinieron. El futuro y condicional también son irregulares: vendré, vendrás; vendría, vendrías.

La diferencia entre "venir" e "ir" en español es más estricta que en inglés. En inglés se puede decir "I'm coming to your party" incluso cuando no estás físicamente con la persona, mientras que en español, desde el punto de vista del hablante, si la fiesta es en casa de alguien que no está contigo ahora, técnicamente "vas" a la fiesta. Sin embargo, en el habla cotidiana, el español está adoptando usos más flexibles.

La perífrasis "venir a + infinitivo" expresa aproximación o finalidad: "Esto viene a costar unos doscientos euros" (approximately), "Vengo a preguntarte algo importante" (I've come to ask you). Y "venirse" (reflexivo) en contextos familiares puede significar decidirse a ir: "¿Te vienes con nosotros al cine?"

Expresiones importantes: "venir al caso" (to be relevant), "venir como anillo al dedo" (to fit perfectly), "venir bien" (to suit), "¡venga!" (come on!/okay!/used constantly in Spain as agreement or encouragement).`,
    examples: [
      { es: "¿Vienes esta tarde a casa de Marta? Vamos a ver la final del campeonato todos juntos." },
      { es: "Mi primo viene de Argentina la próxima semana y se queda con nosotros durante diez días." },
      { es: "Vengo a recoger el paquete que dejasteis ayer en la conserjería del edificio." },
      { es: "No vino a clase en toda la semana y nadie sabe qué le ha pasado." },
      { es: "¿Te vienes con nosotros a la excursión del sábado? Hay sitio libre en el coche." },
    ],
    didYouKnow: [
      `"¡Venga!" es una de las palabras más versátiles del español coloquial de España. Dependiendo del contexto y la entonación puede significar: "de acuerdo" (okay), "¡vamos!" (let's go!), "no me lo creo" (no way!), "¡date prisa!" (hurry up!), o simplemente servir como despedida informal ("¡Venga, hasta luego!"). Un hablante nativo puede usar "venga" docenas de veces al día con significados completamente distintos.`,
      `El verbo venir es extraordinariamente productivo en composición con prefijos: prevenir, convenir, intervenir, sobrevenir, advenir. Todos conservan la irregularidad de venir: prevengo, convengo, intervengo. Esta familia léxica es especialmente rica en el vocabulario culto y técnico. "Prevenir" (prevent), "convenir" (to be suitable/agree), "sobrevenir" (to happen suddenly) son ejemplos de cómo un solo verbo irregular da lugar a toda una familia de términos.`,
    ],
  },

  decir: {
    description: `El verbo "decir" es fundamental en español porque la comunicación verbal y el reporte de discurso ajeno son centrales en cualquier lengua. Decir significa "to say" o "to tell" y aparece constantemente en el discurso directo ("María dijo: 'Estoy cansada'") y en el discurso indirecto ("María dijo que estaba cansada"). Dominar las estructuras de estilo indirecto con decir es esencial para relatar conversaciones, contar historias y trabajar con textos escritos.

Gramaticalmente, decir es uno de los verbos más irregulares del español. En el presente de indicativo: digo, dices, dice, decimos, decís, dicen. El imperativo informal es muy corto: di (no "dice"). El pretérito indefinido es completamente irregular: dije, dijiste, dijo, dijimos, dijisteis, dijeron (con -j-, no -g-). El futuro y condicional tienen raíz irregular: diré, dirás; diría, dirías. El participio también es irregular: dicho.

Una de las funciones más importantes es introducir el estilo indirecto. El tiempo verbal de la frase introducida cambia: si alguien dice "Estoy cansado" y lo reportamos, decimos "Dijo que estaba cansado" (el presente se convierte en imperfecto). Este fenómeno, llamado concordancia de tiempos, requiere práctica constante.

La forma impersonal "se dice que..." es muy frecuente para reportar rumores o información de fuente indeterminada: "Se dice que van a cerrar la fábrica", "Se dice que fue un gran actor". También "dicho esto" (having said this) y "dicho de otra manera" (in other words) son expresiones conectoras muy útiles en el discurso formal.

Expresiones con decir: "dicho y hecho" (no sooner said than done), "¿qué quieres decir?" (what do you mean?), "es decir" (that is to say, i.e.), "mejor dicho" (or rather), "¡ni que decir tiene!" (it goes without saying!). La expresión "es decir" es especialmente frecuente en el habla explicativa y académica.`,
    examples: [
      { es: "Le dije la verdad aunque sabía que no era lo que quería escuchar en ese momento." },
      { es: "¿Qué quieres decir con que no puedes venir? Llevamos semanas planeando este viaje." },
      { es: "Se dice que los mejores restaurantes de paella están en los pueblos del interior de Valencia." },
      { es: "Dicen que en este barrio hay un café donde se reúnen los mejores escritores de la ciudad." },
      { es: "Mi jefe siempre dice que el trabajo en equipo es más importante que el talento individual." },
    ],
    didYouKnow: [
      `Las formas del pretérito de decir (dije, dijiste, dijo...) con -j- son resultado de una evolución fonética del latín. "Dixi" (yo dije en latín) evolucionó a través de varias fases: "dixe" → "dije". Este cambio de "x" a "j" explica también por qué verbos como traer (traje, trajiste) y atraer tienen -j- en el pretérito: todos comparten el mismo proceso fonético histórico.`,
      `La palabra "adiós" viene de la expresión "a Dios", forma abreviada de "a Dios te encomiendo" (I commend you to God) o "vaya usted con Dios" (go with God). Este saludo de despedida, que hoy usamos sin pensar en su origen, es un ejemplo fascinante de cómo el lenguaje guarda capas de historia cultural. En el español actual convive con "hasta luego" y "chao" (adaptación del italiano "ciao").`,
    ],
  },

  dar: {
    description: `El verbo "dar" es uno de los más versátiles del español. Aunque su significado principal es "entregar o transferir algo a alguien", en la práctica aparece en un número asombroso de expresiones y construcciones que van mucho más allá. "Dar" a veces equivale a "producir" (el árbol da frutos), "causar" (esto me da frío), "realizar una acción" (dar un paseo, dar una clase, dar un abrazo) o incluso "resultar indiferente" (me da igual, da lo mismo).

Gramaticalmente, dar es irregular especialmente en primera persona del presente y en el pretérito indefinido. Presente de indicativo: doy, das, da, damos, dais, dan. La forma "doy" tiene la terminación irregular en "-oy" que comparte con soy (ser), voy (ir) y estoy (estar). El pretérito indefinido es completamente irregular: di, diste, dio, dimos, disteis, dieron — sin acentos, aunque dar es un verbo monosílabo.

La construcción "dar + sustantivo" es extraordinariamente productiva: dar miedo (to scare), dar asco (to disgust), dar igual/lo mismo (not to matter), dar pena (to feel sorry for), dar vergüenza (to feel embarrassed), dar envidia (to make someone envious), dar ánimos (to encourage). Estas construcciones son esenciales para expresar estados emocionales y reacciones, con matices que no se capturan fácilmente con una traducción directa.

"Darse cuenta" (to realize) es una de las expresiones más frecuentes del español coloquial: "No me di cuenta de que habías llegado", "¿Te das cuenta de lo que estás diciendo?". También "darse prisa" (to hurry up), "darse por vencido" (to give up), y "darse aires" (to put on airs) son muy comunes.

La expresión "¿qué le vamos a dar?" expresa resignación. "Dar a luz" (to give birth) es otro ejemplo de cómo dar forma parte de expresiones idiomáticas totalmente lexicalizadas en el español cotidiano.`,
    examples: [
      { es: "Me da mucho miedo hablar en público, aunque soy profesora y lo hago todos los días." },
      { es: "Le di las gracias por su ayuda y le prometí que yo haría lo mismo cuando pudiera." },
      { es: "¿Te da igual si llegamos un poco tarde a la cena de esta noche?" },
      { es: "El médico le dio el alta después de tres días de observación en el hospital." },
      { es: "Dieron una clase magistral sobre la historia del flamenco en el conservatorio municipal." },
    ],
    didYouKnow: [
      `"Dar a luz" (to give birth, literally "to give to the light") es una de las expresiones más poéticas del español cotidiano. Su equivalente culto es "alumbrar" (to give birth, literally "to illuminate"), del mismo campo semántico de la luz. En muchas culturas el nacimiento se asocia metafóricamente con la llegada de la luz, y el español ha conservado esta imagen poética en el lenguaje ordinario y cotidiano.`,
      `El giro "dar en el clavo" (to hit the nail on the head) tiene su origen en la herrería. El clavo de una herradura debía clavarse exactamente en el lugar correcto del casco del caballo; dar en el clavo significaba hacer el trabajo perfectamente a la primera. Esta expresión existe también en inglés como calco del español, mostrando la influencia histórica del español en algunos ámbitos del inglés.`,
    ],
  },

  ver: {
    description: `El verbo "ver" es fundamental para describir la percepción visual, pero también tiene múltiples usos metafóricos y expresivos que lo hacen imprescindible en la comunicación cotidiana. Ver significa "to see" (percibir con los ojos) y se diferencia de "mirar" (to look/to watch), que implica una atención deliberada: "Veo el pájaro" (I see the bird, por casualidad), "Miro el pájaro" (I'm looking at the bird, conscientemente). Esta distinción es similar a la de "hear" (oír) frente a "listen" (escuchar) en inglés.

Gramaticalmente, ver es irregular en primera persona del presente: veo (con la raíz ve- que mantiene la -e-). El resto del presente es regular: ves, ve, vemos, veis, ven. El pretérito imperfecto también es irregular: veía, veías, veía, veíamos, veíais, veían (mantiene la -e- de la raíz, a diferencia de los verbos regulares en -er). El participio es irregular: visto.

Además de la percepción visual, ver se usa para "entender o comprender": "Ya veo lo que quieres decir" (I see/understand what you mean), "¿Ves a qué me refiero?". También para visitar o encontrarse con alguien: "Tengo que ver a mi madre este fin de semana". Y para descubrir o averiguar: "Hay que ver si es posible" (We need to see if it's possible).

"Verse" (reflexivo) tiene usos especiales: "verse obligado a" (to be forced to), "verse en apuros" (to find oneself in trouble), "ya se verá" (we'll see), "verse las caras" (to face each other). En Latinoamérica, "te ves muy bien" significa "you look great" y es más frecuente que "te ves bien" en España.

Expresiones importantes: "ya veremos" (we'll see), "ver las estrellas" (to see stars from pain), "a ver" (let's see — usado constantemente como muletilla), "verlas venir" (to see trouble coming), "ver para creer" (seeing is believing), "ni se te ve el pelo" (you've been nowhere to be seen lately).`,
    examples: [
      { es: "Veo a mis vecinos casi todos los días en el portal, pero nunca hablamos realmente." },
      { es: "¿Has visto las noticias esta mañana? Ha pasado algo muy importante en el centro de la ciudad." },
      { es: "Ya veo que esto no va a ser tan fácil como pensábamos al principio del proyecto." },
      { es: "Fuimos al cine a ver la última película de ese director y nos encantó a todos por igual." },
      { es: "A ver si nos vemos pronto, que hace meses que no quedamos para tomar algo." },
    ],
    didYouKnow: [
      `La expresión "a ver" se ha convertido en una de las muletillas más frecuentes del español oral, similar al "um" o "well" del inglés. En el uso coloquial, "a ver" puede significar "let me think", "let's see", "well..." o simplemente servir como pausa para pensar. Los lingüistas llaman a estas expresiones "marcadores discursivos" y su alta frecuencia muestra que "ver" ha trascendido completamente su significado literal de percepción visual.`,
      `El participio irregular "visto" da lugar a varias expresiones consolidadas en el español formal y cotidiano: "por lo visto" (apparently), "visto bueno" (approval — se usa en documentos oficiales), "bien/mal visto" (well/poorly regarded socially), "dar el visto bueno" (to approve/give the green light). Esta riqueza expresiva de un solo participio irregular muestra cómo el vocabulario básico genera todo un ecosistema léxico.`,
    ],
  },

  poner: {
    description: `El verbo "poner" es uno de los más productivos y frecuentes del español. Su significado básico es "colocar algo en un lugar" (to put/to place), pero sus usos se extienden enormemente. "Poner" aparece en la formación de verbos compuestos muy frecuentes (componer, disponer, proponer, suponer, imponer), en el uso reflexivo "ponerse" con múltiples significados, y en una gran cantidad de expresiones idiomáticas del español cotidiano.

Gramaticalmente, poner es irregular. En presente de indicativo: pongo, pones, pone, ponemos, ponéis, ponen. La forma "pongo" tiene la -g- característica de vengo (venir), tengo (tener), salgo (salir), hago (hacer). El pretérito indefinido es completamente irregular: puse, pusiste, puso, pusimos, pusisteis, pusieron. El futuro y condicional también son irregulares: pondré, pondrás; pondría, pondrías. El participio es irregular: puesto.

"Ponerse + adjetivo" es una construcción riquísima del español: "ponerse rojo" (to blush), "ponerse nervioso" (to get nervous), "ponerse malo" (to get sick), "ponerse en contacto" (to get in touch), "ponerse al día" (to get up to date), "ponerse de acuerdo" (to agree). Esta construcción expresa un cambio de estado, similar al inglés "to get + adjective" pero más versátil y frecuente.

"Ponerse a + infinitivo" indica el inicio de una acción: "Me puse a llorar" (I started crying), "Se puso a cantar" (She started singing), "¡Ponte a estudiar de una vez!" (Start studying already!). Esta perífrasis indica el comienzo súbito de una actividad, a menudo con un matiz de urgencia o sorpresa.

Expresiones idiomáticas: "poner en marcha" (to set in motion), "ponerse las pilas" (to get one's act together), "poner verde a alguien" (to criticize harshly), "ponerse las botas" (to eat/enjoy a lot), "no poner impedimentos" (not to stand in the way).`,
    examples: [
      { es: "Pon los libros en la estantería cuando termines de estudiar, por favor." },
      { es: "Me puse muy nerviosa cuando me llamaron para la entrevista de trabajo esa tarde." },
      { es: "¿Dónde pusiste mis llaves? No las encuentro por ningún lado y llego tarde." },
      { es: "Puse en marcha el proyecto hace tres meses y ya está dando sus primeros frutos." },
      { es: "Se puso a llover justo cuando habíamos llegado a la cima de la montaña después de dos horas subiendo." },
    ],
    didYouKnow: [
      `El modismo "ponerse las pilas" (to get one's act together, literally "put in your batteries") es relativamente moderno, surgido cuando las baterías recargables se popularizaron en los años 80. La imagen de un aparato al que "se le acaban las pilas" y necesita recargar es la metáfora de alguien que está perdiendo energía o motivación. Es un ejemplo fascinante de cómo la tecnología cotidiana moldea y enriquece el lenguaje.`,
      `El verbo "poner" en composición con prefijos genera toda una familia léxica: "componer" (to compose), "disponer" (to arrange), "proponer" (to propose), "suponer" (to suppose), "imponer" (to impose), "reponer" (to replace), "exponer" (to expose). Todos conservan la irregularidad de poner: compongo, dispongo, propongo, supongo, impongo. Esta productividad morfológica es especialmente rica en el vocabulario culto, académico y técnico del español.`,
    ],
  },

  volver: {
    description: `El verbo "volver" expresa el regreso a un lugar o estado anterior, y es uno de los más frecuentes en conversaciones sobre rutinas, viajes y cambios vitales. Su significado principal es "regresar o retornar" (to return, to come back), pero "volver a + infinitivo" es una construcción de extraordinaria importancia que significa "hacer algo de nuevo" (to do something again): "Vuelvo a intentarlo" (I'll try again), "No vuelvas a hacer eso" (Don't do that again).

Gramaticalmente, volver es un verbo irregular con cambio de raíz o→ue en las formas tónicas del presente: vuelvo, vuelves, vuelve, volvemos, volvéis, vuelven. El participio es irregular: vuelto (no "volvido"). En el pretérito indefinido es regular: volví, volviste, volvió. El imperfecto también es regular: volvía, volvías...

La construcción "volver a + infinitivo" merece especial atención porque es muy frecuente y elegante. En inglés requiere el adverbio "again" añadido al verbo: "to try again", "to call again". En español, la idea de repetición se integra en la perífrasis verbal: "Vuelve a llamarme si hay problemas" (Call me again if there are problems), "Ha vuelto a ganar" (He's won again). Esta construcción es preferida en el habla culta sobre "hacer algo otra vez".

"Volverse + adjetivo" expresa una transformación gradual o repentina: "Se ha vuelto muy serio desde que le ascendieron" (He's become very serious since his promotion), "volverse loco" (to go crazy), "volverse imposible" (to become impossible). Compite con "hacerse" y "ponerse" con matices distintos.

Expresiones importantes: "volver en sí" (to regain consciousness), "volver a las andadas" (to go back to one's old ways), "volver la espalda" (to turn one's back on someone), "volver a empezar" (to start over — muy frecuente en contextos de motivación y superación personal).`,
    examples: [
      { es: "Volví a casa tarde anoche y no quería despertar a nadie encendiendo la luz del pasillo." },
      { es: "¿Cuándo vuelves de las vacaciones? Te he echado mucho de menos estas semanas de agosto." },
      { es: "No vuelvas a hacer eso sin avisarme antes; me pusiste muy nervioso con tu desaparición." },
      { es: "El equipo volvió a ganar después de tres partidos consecutivos sin conseguir ningún gol." },
      { es: "Se volvió muy reservado después de lo que pasó y apenas habla con nadie del trabajo." },
    ],
    didYouKnow: [
      `La canción "Volver" de Carlos Gardel (con letra de Alfredo Le Pera, 1935) es probablemente una de las piezas musicales en español más conocidas del mundo en el contexto del tango argentino. La palabra "volver" cargada de nostalgia por el regreso a lugares y personas del pasado resume perfectamente el espíritu del tango. La canción fue también popularizada internacionalmente por Pedro Almodóvar, quien tituló así su película de 2006.`,
      `La distinción entre "volver" y "regresar" tiene matices dialectales. En el español de España, "volver" es el verbo más neutro para el regreso. En algunas variedades del español de América Latina, "regresar" es más frecuente en contextos donde en España se usaría "volver". Esta variación léxica regional es uno de los muchos ejemplos de cómo el español presenta riqueza y diversidad sin perder la mutua inteligibilidad entre sus hablantes.`,
    ],
  },

  hablar: {
    description: `El verbo "hablar" es uno de los primeros que aprende cualquier estudiante de español, y con razón: es el prototipo del verbo regular en -ar, sirve de modelo para explicar toda la conjugación de este grupo (el más numeroso del español), y además es un verbo de contenido fundamental para la comunicación. "Hablar" significa "to speak/to talk" y, a diferencia de "decir" (enfocado en el contenido de lo que se dice), hablar enfatiza el acto mismo de comunicarse o el idioma utilizado.

Gramaticalmente, hablar es completamente regular. En el presente de indicativo: hablo, hablas, habla, hablamos, habláis, hablan. Esta regularidad lo hace perfecto como verbo modelo para enseñar las terminaciones del grupo -ar. En pretérito indefinido también es regular: hablé, hablaste, habló, hablamos, hablasteis, hablaron. El imperfecto: hablaba, hablabas... El subjuntivo presente: hable, hables, hable, hablemos, habléis, hablen.

Una distinción importante es entre "hablar" y "decir". "Hablar" se refiere al acto de comunicarse oralmente o a la facultad del lenguaje: "Habla muy bien el inglés" (She speaks English very well), "Hablaron durante horas sobre el tema" (They talked for hours). "Decir" se refiere al contenido concreto de lo que se comunica: "Dijo que vendría" (He said he would come), "¿Qué dijo?" (What did he say?).

"Hablar de" (to talk about) y "hablar con" (to talk to/with) son las preposiciones más frecuentes: "Necesito hablar contigo de algo importante". "Hablar por teléfono" (to talk on the phone) es también muy frecuente en la vida cotidiana.

Expresiones con hablar: "hablar por los codos" (to talk a lot, literally "to talk through your elbows"), "hablar en plata" (to speak plainly/honestly), "no hablar más del asunto" (to drop the subject), "hablando del rey de Roma..." (speak of the devil...). "Hablar por los codos" es una de las expresiones más vívidas del español coloquial.`,
    examples: [
      { es: "Hablo con mi madre por teléfono cada domingo por la mañana, sin falta, desde que me mudé." },
      { es: "Habla inglés con mucha fluidez porque vivió cinco años trabajando en Londres." },
      { es: "Necesitamos hablar de la situación económica de la empresa antes del viernes próximo." },
      { es: "¿Con quién hablabas cuando te llamé? Estabas muy pendiente del teléfono todo el rato." },
      { es: "El director habló durante dos horas sobre los planes de expansión internacional de la empresa." },
    ],
    didYouKnow: [
      `El español es la segunda lengua más hablada del mundo como lengua materna, con más de 480 millones de hablantes nativos, y la tercera en número total de hablantes incluyendo los que la hablan como segunda lengua. En cuanto a diversidad geográfica, el español es la lengua oficial en 20 países soberanos — el mayor número de cualquier idioma del mundo —, lo que lo convierte en un vehículo cultural de dimensiones globales únicas.`,
      `"Hablar en cristiano" es una expresión muy usada en España para pedir que alguien hable con claridad: "Habla en cristiano, que no te entiendo". Su origen está en la Edad Media, cuando "hablar en cristiano" significaba hablar en castellano (lengua de los reinos cristianos) frente al árabe o el latín. Hoy ha perdido completamente su connotación religiosa y es simplemente sinónimo de "habla claro y con sencillez".`,
    ],
  },

  comer: {
    description: `El verbo "comer" es el prototipo del verbo regular en -er, el segundo grupo de verbos del español. Es también un verbo fundamental para la vida cotidiana, ya que la alimentación y las comidas son una parte central de la cultura hispana. España e Hispanoamérica tienen fuertes tradiciones gastronómicas, y el vocabulario en torno a comer es especialmente rico y variado.

Gramaticalmente, comer es completamente regular. En el presente de indicativo: como, comes, come, comemos, coméis, comen. En pretérito indefinido: comí, comiste, comió, comimos, comisteis, comieron. El imperfecto: comía, comías, comía, comíamos, comíais, comían. Esta regularidad hace de comer el verbo modelo para todo el paradigma de la segunda conjugación.

Una distinción cultural importante: en España, "comer" se usa frecuentemente para referirse a la comida del mediodía (la principal del día), no al desayuno ni la cena. "¿Ya has comido?" se entiende casi siempre como "¿Ya has comido al mediodía?". Esta centralidad de la comida del mediodía refleja la estructura tradicional del día en España, donde el almuerzo se hace entre las 2 y las 4 de la tarde y es la comida más abundante.

"Comerse" (reflexivo enfático) añade matices de intensidad o totalidad: "¡Se comió todo el pastel!", "Me lo he comido con todo". Este uso reflexivo enfatiza la completitud de la acción y es muy frecuente en el habla coloquial.

Expresiones con comer: "comer como un cerdo/una lima" (to eat very much), "comer el coco" (to brainwash or obsess), "comerse con los ojos" (to devour with one's eyes), "comerse la cabeza" (to overthink: "No te comas tanto la cabeza, que no es tan grave"). Esta última expresión es muy frecuente en el español actual de España.`,
    examples: [
      { es: "Como en casa casi todos los días; me gusta cocinar y es más sano que los restaurantes." },
      { es: "Comimos en un restaurante de mariscos increíble cerca del puerto de San Sebastián." },
      { es: "Mi hijo no quiere comer verduras, así que tengo que esconderlas en los platos con ingenio." },
      { es: "¿Habéis comido ya? Porque tengo hambre y me apetece mucho ir a por algo." },
      { es: "Se comió todo el postre antes de que llegaran el resto de los invitados a la cena." },
    ],
    didYouKnow: [
      `En España, la principal comida del día es el almuerzo o "la comida", que se hace entre las 2 y las 4 de la tarde. La cena española es notablemente más tardía que en otros países europeos: no es raro cenar a las 9 o las 10 de la noche. Esta estructura horaria, que sorprende a los turistas extranjeros, está relacionada con el horario de trabajo tradicional español y con el huso horario: España geográficamente debería tener la hora de Portugal, pero usa la hora de Centroeuropa.`,
      `La palabra "compañero" (companion) viene del latín "com" (with) y "panis" (bread), y literalmente significa "el que comparte el pan". El pan —y por extensión la comida— ha sido históricamente tan central en la convivencia social que dio nombre a la amistad y la camaradería. De la misma raíz latina "panis" vienen las palabras "pan", "panera", y el prefijo en palabras como "panificadora". Comer juntos, compartir el pan, es el fundamento lingüístico de la compañía humana.`,
    ],
  },

  vivir: {
    description: `El verbo "vivir" es el prototipo del verbo regular en -ir, el tercer grupo de conjugación del español. Aunque es el grupo menos numeroso, incluye verbos muy frecuentes (vivir, escribir, recibir, subir, salir, abrir). Vivir significa "to live" en todos sus sentidos: la existencia biológica ("Los humanos vivimos menos de 100 años de media"), el domicilio ("Vivo en Madrid desde hace diez años"), y la experiencia de vida ("Vivió aventuras increíbles en su juventud").

Gramaticalmente, vivir es completamente regular. En el presente de indicativo: vivo, vives, vive, vivimos, vivís, viven. En pretérito indefinido: viví, viviste, vivió, vivimos, vivisteis, vivieron. El imperfecto: vivía, vivías, vivía, vivíamos, vivíais, vivían. La regularidad de vivir lo hace perfecto como verbo modelo del grupo -ir.

Vivir admite múltiples complementos que definen cómo se vive: "vivir bien/mal", "vivir solo/acompañado", "vivir para" (to live for something), "vivir de" (to live off/make a living from). "¿De qué vive?" significa "¿Cuál es su profesión?" o "¿De dónde saca el dinero para vivir?". La contraposición "Vivo para trabajar" vs "Trabajo para vivir" es una distinción filosófica frecuentemente citada sobre las prioridades vitales.

"Vivirse" aparece en expresiones de intensidad: "¡Hay que vivirlo para creerlo!" (You have to live it to believe it!).

Expresiones con vivir: "vivir al día" (to live from day to day, without savings), "vivir del cuento" (to live off others without working), "vivir en las nubes" (to have one's head in the clouds), "vivir y dejar vivir" (live and let live), "¡viva!" (long live! / hurray!). El grito "¡Viva España!" o "¡Viva el rey!" es el imperativo de vivir como exclamación de celebración o lealtad.

Un aspecto cultural: en las culturas hispanas, "vivir bien" frecuentemente se refiere a la calidad de vida, las relaciones familiares y el disfrute del tiempo libre, no solo a la riqueza material.`,
    examples: [
      { es: "Vivo en Barcelona desde hace cinco años, aunque soy originalmente de un pueblo de Extremadura." },
      { es: "Mis abuelos vivieron toda su vida en el mismo pueblo y nunca quisieron marcharse a ningún lugar." },
      { es: "¿Dónde vives ahora? ¿Sigues en el piso del centro o te has mudado a las afueras?" },
      { es: "Vivimos unos tiempos muy complicados, pero creo que juntos podemos superarlo todo." },
      { es: "Hay que vivir cada día como si fuera el último, sin dejar las cosas importantes para mañana." },
    ],
    didYouKnow: [
      `La exclamación "¡viva!" como expresión de alegría existe en inglés como préstamo directo del español: "Viva!" en inglés (especialmente en contextos relacionados con la cultura latina) significa "hurray" o "long live". El inglés ha tomado prestada esta forma imperativa de vivir junto con otras palabras españolas como "fiesta", "siesta" y "plaza", mostrando la influencia cultural hispana en el vocabulario inglés moderno.`,
      `El himno nacional de España, la Marcha Real, es uno de los pocos himnos del mundo sin letra oficial permanente. Ha habido varios intentos a lo largo de la historia de ponerle letra, pero ninguno ha prosperado. Sin embargo, en celebraciones deportivas y actos populares, la palabra "viva" y sus variaciones son de las más escuchadas cuando los españoles expresan orgullo colectivo de manera espontánea e improvisada.`,
    ],
  },

  trabajar: {
    description: `El verbo "trabajar" es fundamental en el vocabulario cotidiano del español, tanto para hablar de empleo y profesión como para describir el esfuerzo en cualquier actividad. Trabajar significa "to work" y puede referirse al trabajo remunerado ("Trabajo en un banco"), a una actividad que requiere esfuerzo ("Hay que trabajar mucho para conseguirlo"), o al funcionamiento de algo ("El motor trabaja perfectamente").

Gramaticalmente, trabajar es completamente regular del grupo -ar. En el presente de indicativo: trabajo, trabajas, trabaja, trabajamos, trabajáis, trabajan. En pretérito indefinido: trabajé, trabajaste, trabajó, trabajamos, trabajasteis, trabajaron. Esta regularidad lo hace uno de los verbos más fáciles de conjugar para los estudiantes de español.

El campo semántico de trabajar se extiende a través de varias construcciones frecuentes: "trabajar de" + profesión (to work as a...: "Trabaja de enfermera"), "trabajar en" + lugar o sector ("Trabaja en el hospital/en el sector tecnológico"), "trabajar con" + herramientas o personas ("Trabaja con ordenadores/con niños"). Estas preposiciones distintas expresan matices diferentes y su uso correcto es señal de dominio del idioma.

"Trabajar" también se usa en sentido figurado: "La máquina trabaja bien" (the machine works well), "Hay que trabajar la paciencia" (one needs to work on developing patience). Esta extensión metafórica del significado es muy productiva.

Expresiones con trabajar: "trabajar como una mula/un burro" (to work very hard), "trabajar codo con codo" (to work side by side), "trabajar en equipo" (teamwork), "buen trabajo" (good job), "trabajo en negro" (undeclared/off-the-books work). La expresión "trabajo en negro" describe el empleo informal no declarado a la seguridad social, fenómeno con importantes implicaciones sociales y económicas en el mundo hispanohablante.`,
    examples: [
      { es: "Trabajo en una empresa de tecnología desde hace tres años y me siento muy a gusto allí." },
      { es: "Mi padre trabajó en la misma fábrica durante treinta años hasta que se jubiló a los 65." },
      { es: "Está trabajando muy duro para aprobar el examen de acceso a la universidad este año." },
      { es: "Trabajan desde casa tres días a la semana desde que la empresa adoptó el teletrabajo." },
      { es: "¿Dónde trabajas? Llevas mucho tiempo hablando de ese proyecto tan interesante que tienes." },
    ],
    didYouKnow: [
      `La palabra "trabajo" viene del latín "tripalium", un instrumento de tortura de tres palos. Este origen etimológico refleja una visión histórica del trabajo como algo sufrido y penoso, opuesta a la visión protestante del trabajo como virtud y llamada divina. Curiosamente, la palabra francesa "travail" y la italiana "travaglio" tienen el mismo origen doloroso, mientras que el inglés "work" viene del germánico y tiene una connotación más neutra.`,
      `España tiene una de las tasas de teletrabajo más bajas de Europa Occidental, a pesar de su alta conectividad digital. Estudios sociológicos sugieren que la cultura laboral española, con su énfasis en la presencia física y las relaciones personales en el lugar de trabajo, junto con los horarios más tardíos, ha dificultado la adopción masiva del trabajo remoto. La pandemia de 2020 aceleró el cambio, pero la vuelta a la oficina fue también más rápida en España que en muchos países vecinos.`,
    ],
  },

  estudiar: {
    description: `El verbo "estudiar" es especialmente relevante en el contexto de los aprendices de español, ya que describe precisamente la actividad que estos usuarios están realizando. Estudiar significa "to study" y se refiere tanto al aprendizaje académico formal como al esfuerzo cognitivo de aprender cualquier cosa. Es un verbo regular del grupo -ar con una particularidad fonética: la "i" de su raíz puede ser átona o tónica dependiendo de la persona.

En las personas con acento tónico en la raíz (yo, tú, él, ellos), la "i" puede llevar acento gráfico: estúdio, estúdias, estúdia, estúdian en la pronunciación con hiato. Sin embargo, en muchas regiones hispanohablantes la pronunciación es diptongada (es-tu-DIO), y la RAE acepta ambas pronunciaciones. En el presente de indicativo: estudio, estudias, estudia, estudiamos, estudiáis, estudian.

"Estudiar para" + sustantivo de profesión significa prepararse para ser algo: "Está estudiando para médico/abogado/enfermera". "Estudiar + idioma/materia" significa aprender ese idioma o materia: "Estudia japonés en la academia". La diferencia entre "estudiar" y "aprender" es que estudiar es el proceso (el esfuerzo y la dedicación), mientras que aprender es el resultado (la adquisición del conocimiento o habilidad).

"Estudiar a fondo" (to study thoroughly), "estudiar de memoria" (to memorize), "estudiarse el tema" (to study a topic carefully, con reflexivo enfático) son construcciones muy frecuentes. "¿Estudiaste para el examen?" es quizás la pregunta más universal en el contexto estudiantil de todo el mundo hispanohablante.

Expresiones relacionadas: "estar en sus estudios" (to be doing one's studies), "becario de estudios" (scholarship student), "estudio de mercado" (market research). La palabra "estudio" es un falso cognado parcial: "el estudio de un pintor" sí es su "studio" en inglés, pero "un piso estudio" en español es un "studio apartment", significados que divergen según el contexto.`,
    examples: [
      { es: "Estudio español desde hace seis meses y ya puedo mantener conversaciones sencillas con nativos." },
      { es: "Estudió Derecho durante cinco años y ahora trabaja en un bufete de abogados importante." },
      { es: "Tengo que estudiar mucho este fin de semana; el examen final es el lunes por la mañana." },
      { es: "Mi hermana estudia para médica y pasa noches enteras repasando anatomía y fisiología." },
      { es: "¿Estudiaste el capítulo seis de gramática? Es el que más pregunta el profesor en los exámenes." },
    ],
    didYouKnow: [
      `El español es el idioma extranjero más estudiado del mundo en los Estados Unidos, con más de 8 millones de estudiantes universitarios y millones más en enseñanza secundaria. Este interés masivo ha impulsado un gran mercado de recursos pedagógicos en línea, aplicaciones de aprendizaje de idiomas y turismo lingüístico hacia España y Latinoamérica. La ciudad de Salamanca, sede de una de las universidades más antiguas de Europa (fundada en 1218), recibe anualmente miles de estudiantes extranjeros de español.`,
      `La Real Academia Española (RAE), fundada en 1713, no dicta reglas arbitrariamente: su método consiste en observar el uso real del idioma entre los hablantes y codificarlo. Por eso, cuando una palabra nueva se populariza (como "tuit" para tweet o "selfi" para selfie), la RAE eventualmente la incorpora al diccionario oficial. Esta adaptación constante al uso real es lo que mantiene vivo al español como lengua en evolución y no como reliquia museística.`,
    ],
  },
};

export function getVerbRichContent(slug: string): VerbRichContent | null {
  return DATA[slug] ?? null;
}
