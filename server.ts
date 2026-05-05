import createApp from './app.js';
import chalk from 'chalk';

const app = createApp();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
});