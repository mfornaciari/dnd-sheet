import { JSX_TYPES } from "@babel/types"
import React from "react"

export type CharacterDataType = Readonly<{
  name: string,
  class: number,
  race: number,
  experience: number,
}>

export type FetchedDataType = Readonly<{
  races: RaceType[],
  characterClasses: CharacterClassType[],
  levels: LevelType[],
}>

export type CharacterClassType = Readonly<{
  id: number,
  name: string,
}>

export type RaceType = Readonly<{
  id: number,
  name: string,
}>

export type LevelType = Readonly<{
  id: number,
  level: number,
  minExperience: number,
  maxExperience: number,
}>

export type OptionDataType = Readonly<{
  id: number,
  name: string,
}>
