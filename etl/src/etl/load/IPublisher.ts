export interface IPublisher<D, O> {
    write(input: D, options?: O) : Promise<void>
}