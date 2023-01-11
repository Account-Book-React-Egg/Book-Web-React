export interface InputChange {
    <T>(setState: React.Dispatch<React.SetStateAction<T>>, value?: T): void;
}
