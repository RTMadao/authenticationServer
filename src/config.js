//puerto
process.env.PORT = process.env.PORT || 8080;
//url base de datos
process.env.URLDB = 'mongodb+srv://admin:1143410293@cluster0.pkf7z.mongodb.net/admin_db?retryWrites=true&w=majority';
//vencimiento de token
process.env.CADUCIDAD_TOKEN = '24h';
//seed de autenticacion
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'ClaveMaestra123';