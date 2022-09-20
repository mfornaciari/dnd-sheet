export type levelInfo = Readonly<{
  id: number,
  level: number,
  minExperience: number,
  maxExperience: number
}>

export type characterDataType = Readonly<{
  name: string,
  class: number,
  race: number,
  experience: number,
}>
