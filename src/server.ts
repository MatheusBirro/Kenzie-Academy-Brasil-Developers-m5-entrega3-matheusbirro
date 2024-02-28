import { app } from "./app";

const PORT:number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
   console.log(`API sucessfully started at port ${PORT}`);
});
