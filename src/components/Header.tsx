import { useState } from 'react';
import '../style/style.css';
import InputText from './InputText';
import InputNumber from './InputNumber';
import Select from './Select';
import type { levelInfo } from '../types';
import raceData from '../../data/raceData.json';
import classData from '../../data/classData.json';
import levelData from '../../data/levelData.json';

export default function Header() {
  const raceNames: string[] = raceData.races.map(characterRace => characterRace.name);
  const classNames: string[] = classData.classes.map(characterClass => characterClass.name);
  const levels: levelInfo[] = levelData.levels;

  const [currentXp, setCurrentXp] = useState<number>(0);
  const currentLevel: number = getCurrentLevel(levels, currentXp);

  function getCurrentLevel(levels: levelInfo[], currentXp: number): number {
    const foundLevelInfo: levelInfo | undefined = levels.find(level => {
      return level.minExperience <= currentXp && level.maxExperience >= currentXp
    });
    if (!foundLevelInfo) return currentXp < 0 ? 1 : 20;

    return foundLevelInfo.level;
  }

  return (
    <header>
      <InputText labelText='Nome' placeholderText='Nome do personagem' />

      <Select labelText='Raça' optionNames={raceNames} />

      <Select labelText='Classe' optionNames={classNames} />

      <InputNumber
        labelText='Experiência'
        minValue='0'
        setFormValue={setCurrentXp}
      />

      <div role='region' aria-labelledby='levelLabel' >
        <span id='levelLabel'> Nível </span> <span className='field'>{currentLevel}</span>
      </div>
    </header>
  );
}
