// Enum to represent the state of data
export enum DataStateEnum {
    LOADING = "LOADING",
    LOADED = "LOADED",
    ERROR = "ERROR"
  }
  
  // Interface to represent the application's data state
  export interface AppDataState<T> {
    dataState: DataStateEnum; // Represents the current state (loading, loaded, or error)
    data?: T; // Optional generic data (e.g., Product[] or another type)
    errorMessage?: string; // Optional error message
  }
  