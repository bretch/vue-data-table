let fernet = require('fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcD2QbluuIdCkC6MU065urK-a9cMtQ8ilM4DjKKueOQOBSl8UKfuqTe6qH06V-J9DQzpRaOCD0Fgp2VN7v_qL-oQRLQfPXbv9OTTKMmeoEAXzvsYpVxGqHu5PcDL1pxtXyrzMlMcAhem44NDv2go7UHhUD04rMFIdY_OIhxw9oMu19vO4m_YqXL3Dbo-mU9gGmnD_1'
let token = new fernet.Token({ secret, token: message, ttl: 0 })
let decoded = token.decode()
console.log(decoded)
