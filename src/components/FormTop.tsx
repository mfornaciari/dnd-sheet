import type { CharacterDataType, LevelInfo } from '../types';
import '../style/style.css';
import InputText from './InputText';
import InputNumber from './InputNumber';
import Select from './Select';
import raceData from '../../data/raceData.json';
import classData from '../../data/classData.json';
import levelData from '../../data/levelData.json';

type FormTopProps = Readonly<{
  characterData: CharacterDataType,
  setCharacterData: Function,
}>

const raceNames: string[] = raceData.races.map(characterRace => characterRace.name);
const classNames: string[] = classData.classes.map(characterClass => characterClass.name);
const levels: LevelInfo[] = levelData.levels;

export default ({ characterData, setCharacterData }: FormTopProps) => {
  const currentLevel: number = getCurrentLevel(levels, characterData.experience);

  function getCurrentLevel(levels: LevelInfo[], currentXp: number): number {
    const foundLevelInfo = levels.find(level => {
      return level.minExperience <= currentXp && level.maxExperience >= currentXp
    });
    if (!foundLevelInfo) return 20; // XP over 999.999

    return foundLevelInfo.level;
  }

  return (
    <section id='form-top'>
      <InputText
        labelText='Nome'
        placeholderText='Nome do personagem'
        characterData={characterData}
        setCharacterData={setCharacterData}
        changedCharacterValue={'name'}
      />

      <Select
        labelText='Raça'
        optionNames={raceNames}
        characterData={characterData}
        setCharacterData={setCharacterData}
        changedCharacterValue={'race'}
      />

      <Select
        labelText='Classe'
        optionNames={classNames}
        characterData={characterData}
        setCharacterData={setCharacterData}
        changedCharacterValue={'class'}
        />

      <InputNumber
        labelText='Experiência'
        minValue='0'
        maxValue='999999'
        characterData={characterData}
        setCharacterData={setCharacterData}
        changedCharacterValue={'experience'}
      />

      <div role='region' aria-labelledby='levelLabel' >
        <span id='levelLabel'>Nível</span> <span className='field'>{currentLevel}</span>
      </div>
    </section>
  );
}
