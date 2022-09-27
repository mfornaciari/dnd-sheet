import { useFormContext } from 'react-hook-form';
import type { FetchedDataType, LevelType } from '@/types';
import InputText from '@/components/InputText';
import InputNumber from '@/components/InputNumber';
import Select from '@/components/Select';

type FormTopProps = Readonly<{
  fetchedData: FetchedDataType,
}>

export default function FormTop({ fetchedData }: FormTopProps) {
  const { races, characterClasses, levels } = fetchedData;
  const { getValues } = useFormContext();
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
        <span id='levelLabel'><strong>Nível</strong></span> <span className='field'>{currentLevel}</span>
      </div>
    </section>
  );
}
