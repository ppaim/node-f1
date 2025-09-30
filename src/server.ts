// ESM
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { register } from 'module';


const server = Fastify({
  logger: true
});


server.register(cors, {
  //origin: ["www.ative.me"]
  origin: "*", // todas as origens
});

const teams = [
    { id: 1,name: "Maclaren",base: "Reino Unido" },
    { id: 1,name: "ferrari",base: "Italia" },

]



const drivers = [
     { id: 1,name: "Max Verstappen", team:"Red Bull Racing"},
     { id: 2,name: "Lewis Hamilton", team:"Mercedes"},

]



// Declare a route
server.get('/teams',async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});




server.get('/drivers',async (request, response) => {
  response.type("application/json").code(200);
   return { drivers };
});


interface DriversParams{
  id:string
}

server.get<{Params:DriversParams}>('/drivers/:id',async (request, response) => {
  const id= parseInt(request.params.id);
  const driver = drivers.find( d => d.id === id);  // Compara o Array drivers com oid do request

  if(!driver){
    response.type("application/json").code(404);
    return {message:"Driver not found"}
  }else{
    response.type("application/json").code(200);
    return {driver}
  }

  
});

// Run the server!
server.listen({ port: 3000 }, () => {
  console.log("Server init");
  // Server is now listening on ${address}
});