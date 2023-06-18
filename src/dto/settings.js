class SettingsDto {
  constructor(payload) {
    this.channel = payload.channel
    this.width = payload.width
    this.height = payload.height
    this.fontSize = payload.fontSize
    this.timeOut = payload.timeOut
    this.lastPosition = payload.lastPosition
    this.hardwareAccelerationDisabled = payload.hardwareAccelerationDisabled
  }
}
exports.SettingsDto = SettingsDto
