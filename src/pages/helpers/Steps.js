/* cria a func. interna _count, que recebe um JSON de post da API */
import count from './Count'

const steps = async (allCategorys) =>{
    try{
        allCategorys = await allCategorys
    }catch(error){
        console.log(`steps error: ${error}`)
    }


    /* metodo filter só retorna se o resultado da func. for true */
    var categorys = allCategorys.filter(function(that, i) {

        /*
            Categorys recebe caso o index do valor atual tiver o mesmo index do valor sendo analizado.
            ou sejam caso tivermos uma array:
            
            a = [1, 2, 3, 1]
            se dermos "a.indexOf(1)", nos será retornado "0", pois é onde aparece o primeiro "1";
            então o programa analiza:

            O index do objeto analizado agora ("1"), é 0º, e o indexOf(1) == 0, logo TRUE;

            Quando ele chegar no segundo "1", ele terá:

            O index do objeto analizado agora ("1"), é 3º, e o indexOf(1) == 0, logo FALSE;


        */
        return allCategorys.indexOf(that) === i;
    });

    return categorys
}

export default steps
