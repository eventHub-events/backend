export interface IOrganizerBlankProfileCreationUseCase {
  createBlankProfile(organizerId: string): Promise<string>;
}
