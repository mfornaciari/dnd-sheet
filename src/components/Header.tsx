import '../style/style.css';
import InputText from './InputText';
import InputNumber from './InputNumber';
import Select from './Select';
import raceData from '../../data/raceData.json';
import classData from '../../data/classData.json';

export default function Header() {
  const raceNames: string[] = raceData.races.map(characterRace => characterRace.name);
  const classNames: string[] = classData.classes.map(characterClass => characterClass.name);

  return (
    <header>
      <InputText labelText='Nome' placeholderText='Nome do personagem' />

      <Select labelText='Raça' optionNames={raceNames} />

      <Select labelText='Classe' optionNames={classNames} />

      <InputNumber labelText='Experiência' minValue='0' maxValue='355000' />

      <div role='region' aria-labelledby='levelLabel' >
        <span id='levelLabel'> Nível </span> <span className='field'>1</span>
      </div>
    </header>
  );
}
