import path from 'path'

export interface CreateSettingsConfig {
  name: string
  filePath: string
}

export class CreateSettings {
  constructor(public readonly config: CreateSettingsConfig) {}

  initSettingsFile() {
    const {} = this.config
  }

  get() {}
}
