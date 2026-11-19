import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Youtubers = [
  { pregunta: '¿Cuál es el nombre real de Fernanfloo?',
    opciones: ['Luis Fernando Flores', 'Fernando Luis Silva', 'Luis Alberto Flores', 'Fernando Flores Ruiz'], correcta: 0 },
  { pregunta: '¿De qué país es el youtuber Holasoygerman?',
    opciones: ['España', 'Chile', 'Colombia', 'Argentina'], correcta: 1 },
  { pregunta: '¿Cómo se llama el personaje con el que El Rubius se hizo famoso?',
    opciones: ['Willyrex', 'Vegetta777', 'Grefg', 'El Doblas'], correcta: 3 },
  { pregunta: '¿Cuál de estos youtubers es conocido por sus bromas telefónicas en España?',
    opciones: ['AuronPlay', 'Dross', 'Fernanfloo', 'Holasoygerman'], correcta: 0 },
  { pregunta: '¿A qué se dedica principalmente el youtuber Dross?',
    opciones: ['Gameplays', 'Terror y misterio', 'Vlogs de viajes', 'Cocina'], correcta: 1 },
];

const DragonBall = [
  { pregunta: '¿Quién es el autor de Dragon Ball?',
    opciones: ['Eiichiro Oda', 'Akira Toriyama', 'Hajime Isayama', 'Masashi Kishimoto'], correcta: 1 },
  { pregunta: '¿Quién es el protagonista de Dragon Ball?',
    opciones: ['Vegeta', 'Gohan', 'Goku', 'Krilin'], correcta: 2 },
  { pregunta: '¿Cómo se llama el hermano de Goku?',
    opciones: ['Raditz', 'Nappa', 'Bardock', 'Turles'], correcta: 0 },
  { pregunta: '¿Qué necesitan los Saiyajins para transformarse en Ozaru?',
    opciones: ['Esferas del Dragón', 'Semilla del Ermitaño', 'Luna llena', 'Técnica de Kaio-ken'], correcta: 2 },
  { pregunta: '¿Cuál es el nombre del villano principal en la saga de Cell?',
    opciones: ['Freezer', 'Majin Boo', 'Cell', 'Babidi'], correcta: 2 },
];

export default function App() {
  const [pantalla, setPantalla] = useState(1);      
  const [tema, setTema] = useState(null);           
  const [indice, setIndice] = useState(0);          
  const [seleccion, setSeleccion] = useState(null); 
  const [correctas, setCorrectas] = useState(0);    
  const [incorrectas, setIncorrectas] = useState(0);

  let preguntas = [];
  if (tema === 'Youtubers') {
    preguntas = Youtubers;
  } else if (tema === 'DragonBall') {
    preguntas = DragonBall;
  }
  const actual = preguntas[indice]; 

  function elegirTema(t) {
    setTema(t);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    if (t === 'Youtubers') {
      setPantalla(3);
    } else {
      setPantalla(4);
    }
  }

  function responder(i) {
    setSeleccion(i); 
    if (i === actual.correcta) {
      setCorrectas(correctas + 1);
    } else {
      setIncorrectas(incorrectas + 1);
    }
  }

  function siguiente() {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setSeleccion(null);
    } else {
      setPantalla(5);
    }
  }

  function volverAJugar() {
    setTema(null);
    setIndice(0);
    setSeleccion(null);
    setCorrectas(0);
    setIncorrectas(0);
    setPantalla(2);
  }

  if (pantalla === 1) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.logo}>🎮</Text>
        <Text style={styles.titulo}>QuizZone</Text>
        <Text style={styles.subtitulo}>¡Demuestra cuánto sabes!</Text>
        <Button title="Comenzar" onPress={() => setPantalla(2)} />
      </View>
    );
  }

  if (pantalla === 2) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Selecciona un tema</Text>
        <View style={styles.espacio}>
          <Button title="=== Youtubers ===" onPress={() => elegirTema('Youtubers')} />
        </View>
        <View style={styles.espacio}>
          <Button title="=== Dragon Ball ===" onPress={() => elegirTema('DragonBall')} />
        </View>
        <View style={styles.espacio}>
          <Button title="Atrás" color="#7a869a" onPress={() => setPantalla(1)} />
        </View>
      </View>
    );
  }

  if (pantalla === 3 || pantalla === 4) {
    let mensaje = '';
    if (seleccion !== null) {
      if (seleccion === actual.correcta) {
        mensaje = '¡Correcto! 🎉';
      } else {
        mensaje = 'Incorrecto. La respuesta era: ' + actual.opciones[actual.correcta];
      }
    }

    return (
      <View style={styles.contenedor}>
        <Text style={styles.tema}>
          {tema === 'Youtubers' ? '🎥 Youtubers' : '🐉 Dragon Ball'}
        </Text>
        <Text style={styles.contador}>
          Pregunta {indice + 1} de {preguntas.length} · Puntaje: {correctas}
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.pregunta}>{actual.pregunta}</Text>
        </View>

        <View style={styles.espacio}>
          <Button title={'A. ' + actual.opciones[0]}
            onPress={() => responder(0)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'B. ' + actual.opciones[1]}
            onPress={() => responder(1)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'C. ' + actual.opciones[2]}
            onPress={() => responder(2)} disabled={seleccion !== null} />
        </View>
        <View style={styles.espacio}>
          <Button title={'D. ' + actual.opciones[3]}
            onPress={() => responder(3)} disabled={seleccion !== null} />
        </View>

        {seleccion !== null && (
          <View>
            <Text style={seleccion === actual.correcta ? styles.bien : styles.mal}>
              {mensaje}
            </Text>
            <Button
              title={indice < preguntas.length - 1 ? 'Siguiente' : 'Ver resultados'}
              color="#239455"
              onPress={siguiente}
            />
          </View>
        )}
      </View>
    );
  }

  let mensajeFinal = '';
  if (correctas >= 4) {
    mensajeFinal = '¡Excelente! Tienes grandes conocimientos 🏆';
  } else if (correctas >= 3) {
    mensajeFinal = '¡Muy bien! Casi lo logras 👏';
  } else {
    mensajeFinal = '¡Sigue practicando! 💪';
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>🏆</Text>
      <Text style={styles.titulo}>¡Juego terminado!</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Tu puntaje</Text>
        <Text style={styles.puntaje}>{correctas} / {preguntas.length}</Text>
      </View>

      <View style={styles.fila}>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Correctas</Text>
          <Text style={styles.miniValor}>{correctas}</Text>
        </View>
        <View style={styles.mini}>
          <Text style={styles.etiqueta}>Incorrectas</Text>
          <Text style={styles.miniValor}>{incorrectas}</Text>
        </View>
      </View>

      <Text style={styles.final}>{mensajeFinal}</Text>
      <Button title="Volver a jugar" onPress={volverAJugar} />
    </View>
  );
}   

const styles = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#3f3f41' },
  logo: { fontSize: 64, textAlign: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#ffffff', marginBottom: 10 },
  subtitulo: { fontSize: 16, textAlign: 'center', color: '#596579', marginBottom: 25 },
  espacio: { marginBottom: 12 },
  tema: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' },
  contador: { fontSize: 14, textAlign: 'center', color: '#596579', marginVertical: 8 },
  tarjeta: { backgroundColor: '#3d3939', padding: 18, borderRadius: 12, marginBottom: 16 },
  pregunta: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' },
  bien: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#239455', marginVertical: 10 },
  mal: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#c33c3c', marginVertical: 10 },
  etiqueta: { fontSize: 14, textAlign: 'center', color: '#596579' },
  puntaje: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', color: '#2457c5' },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
  mini: { width: '48%', backgroundColor: '#383838', padding: 14, borderRadius: 12 },
  miniValor: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#202b3c' },
  final: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 18 },
});