import type { Model, Policy, ParameterArgs, Parameter } from '@/data/types'
import models from '@/data/models.json' assert { type: "json" }
import policies from '@/data/policies.json' assert { type: "json" }
import options from '@/data/options.json' assert { type: "json" }
import { reactive } from 'vue'
import { defineStore } from 'pinia'

const makeParameter = (args: ParameterArgs): Parameter => {
    return { min: -Infinity, max: Infinity, ...args }
}

const makeModelOrPolicy = (args: { name: string, label: string, parameters: ParameterArgs[] }) => ({
    name: args.name,
    label: args.label,
    parameters:
        args.parameters.map(parameter => makeParameter(parameter))
});

const makeModel = (args: any): Model => {
    return makeModelOrPolicy(args);
}
const makePolicy = (args: any): Policy => {
    return makeModelOrPolicy(args);
}

export const useStore = defineStore('store', () => ({
    // models: reactive(models.map(model => makeModel(model))),
    // policies: reactive(policies.map(policy => makePolicy(policy))),
    // options: reactive(options.map(option => makeParameter(option)))
    models: reactive(models),
    policies: reactive(policies),
    options: reactive(options),
}));
