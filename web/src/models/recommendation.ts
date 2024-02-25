export interface Recommendation {
  title: string

  headServiceId: string
  tailServiceId: string

  headServiceTriggerId: string
  tailServiceActionId: string

  guidedRecipeId: string

  stepsCount: number
}
