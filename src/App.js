/* importa o Chakra UI como ChakraProvinder */
import { ChakraProvider } from "@chakra-ui/react"
/* importa a página Home */
import { Home } from './pages'

/* função App */
function App() {
  /* retorna */
  return (
    /* o chakra deve apontar para o diretório raiz da aplicação, no caso a home */
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default App;
