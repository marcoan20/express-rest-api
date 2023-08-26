import { Request, Response } from "express";

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const PORT = 3333;

const app = express();

interface ICostumer {
  id: string;
  name: string;
  cpf: string;
  statement: [];
}

const costumers: ICostumer[] = [];

app.use(express.json());

app.post('/account', (req: Request, res: Response) => {
  const {cpf, name} = req.body;

  const costumerAlreadyExists = costumers.some(
    (costumer) => costumer.cpf === cpf
  );

  if(costumerAlreadyExists) {
    return res.status(400).json({error: "Costumer already exists!"});
  }

  costumers.push({
    id: uuidv4(),
    name,
    cpf,
    statement: []
  });

  return res.status(201).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});