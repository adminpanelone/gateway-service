import {ServiceBroker, Service as MoleculerService} from 'moleculer';
import {Service, Action, Event, Method} from 'moleculer-decorators';
import ApiService from 'moleculer-web';
const E = require("moleculer-web").Errors;

const settingsServiceBroker = {
  nodeID: "gateway-api-node-1",
  transporter: "nats://localhost:4222",
  requestTimeout: 5 * 1000
};
const broker = new ServiceBroker(settingsServiceBroker);

const settingsCreateService = {
  mixins: [ApiService],
  name: 'gateway-api',
  settings: {
    port: 4000,
    routes: [
      {
        path: "/",
        whitelist: [
          "users.login",
          "users.register",
        ],
        aliases: {
          "POST /api/register": "users.register",
          "POST /api/login": "users.login"
        },
      },
      {
        authorization: true,
        path: "/api",
        whitelist: [
          "users.getAll",
        ],
        aliases: {
          "GET /users": "users.getAll"
        },
      }]
  }
};

@Service(settingsCreateService)
class GatewayApiService extends MoleculerService {
  @Method
  async authorize(ctx: any, route: any, req: any, res: any) {
    let auth = req.headers["authorization"];
    if (auth && auth.startsWith("Bearer")) {
      let token = auth.slice(7);
      try {
        const res = await broker.call('jwtauth.auth', {token: token}, {});
        ctx.meta.user = res;
        return Promise.resolve(ctx);
      } catch (err) {
        return Promise.reject(new E.UnAuthorizedError(E.ERR_INVALID_TOKEN))
      }
    } else {
      // No token
      return Promise.reject(new E.UnAuthorizedError(E.ERR_NO_TOKEN));
    }

  }

  started() { // Reserved for moleculer, fired when started
    console.log("Started!")
    //...
  }

  created() { // Reserved for moleculer, fired when created
    console.log("Created")
    //...
  }

  stopped() { // Reserved for moleculer, fired when stopped
    console.log("Stopped")
    //...
  }
}


broker.createService(GatewayApiService);
broker.start();