# Nuxt.js Medical Metrics Application

This project is a medical metrics application built with Nuxt.js. It allows users to input medical data for multiple post-operation days, calculate various scores, and visualize these scores using dynamic charts created with D3.js.

## Features

- **Day-Specific Input Forms**: Input forms for days 2, 3, 4, and 5 post-operation.
- **Dynamic Calculations**: Calculates scores based on input values using specific mathematical formulas.
- **Chart Visualization**: Visualizes the calculated scores using scatter plots generated with D3.js.

## Project Structure

### Components

- **DayInput.vue**: A reusable component for inputting and calculating medical data for a specific day.
- **ScatterPlot.vue**: A component for rendering scatter plots using D3.js.

### Pages

- **index.vue**: The main page that includes `DayInput` components for days 2, 3, 4, and 5.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/medical-metrics-app.git
   cd medical-metrics-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Usage

### Inputting Data

For each day (2, 3, 4, 5), enter the following metrics:

- GPT-ALT max
- INR max
- BB (umol/L)
- GOT-AST max

Click the "Calculate!" button to compute the scores and visualize the results.

### Viewing Results

The application will display:

- **Scores**:
  - GPT-ALT score
  - INR score
  - BB score
  - GOT-AST score
- **MEAF Scores**:
  - MEAF-GPT score
  - MEAF-GOT score

The scatter plot will show the MEAF scores over the specified days.

## Technical Details

### Calculations

The calculations for each metric are performed using the following formula:

\[ \text{Score} = \frac{D}{1 + \exp(B \cdot (\ln(\text{value}) - \ln(E)))} \]

### Chart Rendering

Charts are rendered using D3.js, which dynamically adjusts to the size of the container, providing a responsive visualization of the data.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Nuxt.js](https://nuxtjs.org/)
- [D3.js](https://d3js.org/)

---
