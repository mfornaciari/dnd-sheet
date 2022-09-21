import { useFormContext } from 'react-hook-form';
import type { LevelInfo } from '../types';
import '../style/style.css';
import InputText from './InputText';
import InputNumber from './InputNumber';
import Select from './Select';
import raceData from '../../data/raceData.json';
import classData from '../../data/classData.json';
import levelData from '../../data/levelData.json';

const raceNames = raceData.races.map(characterRace => characterRace.name);
const classNames = classData.classes.map(characterClass => characterClass.name);
const levels = levelData.levels;

export default () => {
  const { getValues } = useFormContext();
  const characterData = getValues();
  const currentLevel: number = calculateLevel(levels, characterData.experience);

  function calculateLevel(levels: LevelInfo[], currentXp: number): number {
    const foundLevelInfo = levels.find(level =>
      level.minExperience <= currentXp && level.maxExperience >= currentXp
    );
    if (!foundLevelInfo) return 20; // XP over 999.999

    return foundLevelInfo.level;
  }

  return (
    <section id='form-top'>
      <InputText
        name='name'
        placeholderText='Nome do personagem'
      />

      <Select
        name='race'
        optionNames={raceNames}
      />

      <Select
        name='class'
        optionNames={classNames}
      />

      <InputNumber
        name='experience'
        minValue='0'
        maxValue='999999'
      />

      <div role='region' aria-labelledby='levelLabel'>
        <span id='levelLabel'>Nível</span> <span className='field'>{currentLevel}</span>
      </div>
    </section>
  );
}
