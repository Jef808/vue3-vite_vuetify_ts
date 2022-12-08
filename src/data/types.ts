export type ParameterArgs = {
    name: string,
    label: string,
    value: number,
    min?: number,
    max?: number,
    step: number,
}

export type Parameter = Required<ParameterArgs>;

export type Model = {
    name: string,
    label: string,
    parameters: ParameterArgs[],
}

export type Policy = Model;
