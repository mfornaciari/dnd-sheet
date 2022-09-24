import { useFormContext } from 'react-hook-form';
import type { FetchedDataType, LevelType } from '../types';
import '../style/style.css';
import InputText from './InputText';
import InputNumber from './InputNumber';
import Select from './Select';

type FormTopProps = Readonly<{
  fetchedData: FetchedDataType,
}>

export default ({ fetchedData }: FormTopProps) => {
  const { getValues } = useFormContext();
  const races = fetchedData.races;
  const characterClasses = fetchedData.characterClasses;
  const levels = fetchedData.levels;
  const characterExperience: number = getValues('experience');
  const currentLevel: number = calculateLevel(levels, characterExperience);

  function calculateLevel(levels: LevelType[], currentXp: number): number {
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
        optionData={races}
      />

      <Select
        name='class'
        optionData={characterClasses}
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
