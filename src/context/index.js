import {createContext} from "react";

export const AuthContext = createContext(null) // глобальное хранилище данных, чтобы избежать бесконечную передачу через пропсы и коллбеки, по умолчанию он будет пустой, иниализируем как null
