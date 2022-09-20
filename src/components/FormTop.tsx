import { useState } from 'react';
import '../style/style.css';
import InputText from './InputText';
import InputNumber from './InputNumber';
import Select from './Select';
import type { levelInfo } from '../types';
import raceData from '../../data/raceData.json';
import classData from '../../data/classData.json';
import levelData from '../../data/levelData.json';

export default () => {
  const raceNames: string[] = raceData.races.map(characterRace => characterRace.name);
  const classNames: string[] = classData.classes.map(characterClass => characterClass.name);
  const levels: levelInfo[] = levelData.levels;

  const [currentXp, setCurrentXp] = useState<number>(0);
  const currentLevel: number = getCurrentLevel(levels, currentXp);

  function getCurrentLevel(levels: levelInfo[], currentXp: number): number {
    const foundLevelInfo: levelInfo | undefined = levels.find(level => {
      return level.minExperience <= currentXp && level.maxExperience >= currentXp
    });
    if (!foundLevelInfo) return 20; // XP over 999.999

    return foundLevelInfo.level;
  }

  return (
    <section id='form-top'>
      <InputText labelText='Nome' placeholderText='Nome do personagem' />

      <Select labelText='Raça' optionNames={raceNames} />

      <Select labelText='Classe' optionNames={classNames} />

      <InputNumber labelText='Experiência' minValue='0' maxValue='999999' setFormValue={setCurrentXp} />

      <div role='region' aria-labelledby='levelLabel' >
        <span id='levelLabel'> Nível </span> <span className='field'>{currentLevel}</span>
      </div>
    </section>
  );
}
