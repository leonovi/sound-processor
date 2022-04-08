type Overwrite<Base, Changes> = Pick<Base, Exclude<keyof Base, keyof Changes>> & Changes;
