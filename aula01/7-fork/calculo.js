process.on('message', (message) => {
  const start = Date.now();
  let soma = 0;
  for (let i = 0; i <= 10000000000; i++) {
    soma += i;
  }
  const end = Date.now();
  const tempo = end - start;

  if (soma >= 50000000000067860000 ){
    process.exit(2)
  } else {
    message = { soma, tempo };
  }

  process.send(message); // Envia o resultado para o processo pai
});
