const SCALE = 5;

const ROBOT_WIDTH = 32 * SCALE;
const ROBOT_HEIGHT = 6 * SCALE;

const REEF_WIDTH = 14.5 * SCALE;
const TROUGH_WIDTH = 0.5 * SCALE;
const TROUGH_HEIGHT = 18 * SCALE;

const SUPPORT_HEIGHT = 65 * SCALE;
const SUPPORT_WIDTH = 3.5 * SCALE;

const LEVEL_2_HEIGHT = 32 * SCALE;
const LEVEL_4_HEIGHT = 72 * SCALE;

const LEVES_START_X = REEF_WIDTH - 2.5 * SCALE;

const ELEVATOR_HEIGHT = 92 * SCALE;
const ELEVATOR_WIDTH = 4 * SCALE;

const ARM_LENGTH = 18 * SCALE;
const ARM_WIDTH = 2 * SCALE;

const CORAL_WIDTH = 11.875 * SCALE;
const CORAL_HEIGHT = 4.5 * SCALE;

var robotX;
var elevatorHeight;
var armAngle;

var robotXSlider, elevatorSlider, armSlider;
var elevatorTextBox, armAngleTextBox;
var checkbox;
function setup() {
  createCanvas(500, 500);
  robotX = width / 2;
  createP("Robot Position:").position(10, 0);
  createP("Elevator Height:").position(10, 40);
  createP("Arm Angle:").position(10, 80);

  checkbox = createCheckbox(" move to mouse");
  checkbox.position(10, 150);
  checkbox.checked(false);
  robotXSlider = createSlider(
    ROBOT_WIDTH / 2,
    width - REEF_WIDTH - ROBOT_WIDTH / 2,
    width - REEF_WIDTH - ROBOT_WIDTH / 2
  );
  robotXSlider.position(10, 30);
  robotXSlider.size(80);

  elevatorSlider = createSlider(0, ELEVATOR_HEIGHT / SCALE, 67);
  elevatorSlider.position(10, 70);
  elevatorSlider.size(80);

  armSlider = createSlider(-180, 180, -101);
  armSlider.position(10, 110);
  armSlider.size(80);

  elevatorTextBox = createInput(elevatorSlider.value());
  elevatorTextBox.position(120, 55);

  armAngleTextBox = createInput(armSlider.value());
  armAngleTextBox.position(90, 95);

  elevatorTextBox.input(updateElevator);
  armAngleTextBox.input(updateArm);
}

function updateElevator() {
  elevatorSlider.value(elevatorTextBox.value());
}

function updateArm() {
  armSlider.value(armAngleTextBox.value());
}

function draw() {
  if (mouseIsPressed && mouseX > 0) {
    armSlider.value(armSlider.value() + 1);
    elevatorSlider.value(armSlider.value() + 1);
  }
  robotX = robotXSlider.value();
  elevatorHeight = elevatorSlider.value() * SCALE;
  armAngle = degreesToRadians(armSlider.value());

  elevatorTextBox.value(elevatorSlider.value());
  armAngleTextBox.value(armSlider.value());
  background(255);

  noStroke();

  // Trough
  fill(57);
  rect(width - REEF_WIDTH, height - TROUGH_HEIGHT, TROUGH_WIDTH, TROUGH_HEIGHT);

  beginShape();
  vertex(width - REEF_WIDTH, height - TROUGH_HEIGHT + 2 * SCALE);
  vertex(width - REEF_WIDTH, height);
  vertex(width - SUPPORT_WIDTH, height);
  vertex(width - SUPPORT_WIDTH, height - TROUGH_HEIGHT - SCALE);
  endShape();

  // Pipes
  fill(244, 24, 253);
  beginShape();
  vertex(width - LEVES_START_X, height - LEVEL_2_HEIGHT);
  vertex(
    width - LEVES_START_X - 0.8 * SCALE,
    height - LEVEL_2_HEIGHT + 1.1 * SCALE
  );
  vertex(
    width - LEVES_START_X - 0.8 * SCALE + 22.135 * SCALE,
    height - LEVEL_2_HEIGHT + 1.1 * SCALE + 15.5 * SCALE
  );
  vertex(
    width - LEVES_START_X + 22.135 * SCALE,
    height - LEVEL_2_HEIGHT + 15.5 * SCALE
  );
  endShape();

  beginShape();
  vertex(width - LEVES_START_X, height - LEVEL_2_HEIGHT - 13 * SCALE);
  vertex(
    width - LEVES_START_X - 0.8 * SCALE,
    height - LEVEL_2_HEIGHT + 1.1 * SCALE - 13 * SCALE
  );
  vertex(
    width - LEVES_START_X - 0.8 * SCALE + 22.135 * SCALE,
    height - LEVEL_2_HEIGHT + 1.1 * SCALE + 15.5 * SCALE - 13 * SCALE
  );
  vertex(
    width - LEVES_START_X + 22.135 * SCALE,
    height - LEVEL_2_HEIGHT + 15.5 * SCALE - 13 * SCALE
  );
  endShape();

  rect(width - LEVES_START_X, height - LEVEL_4_HEIGHT, 1.5 * SCALE, 12 * SCALE);
  rect(
    width - LEVES_START_X,
    height - LEVEL_4_HEIGHT + 10.5 * SCALE,
    12 * SCALE,
    1.5 * SCALE
  );

  // Support Structure
  fill(57);
  rect(
    width - SUPPORT_WIDTH,
    height - SUPPORT_HEIGHT,
    SUPPORT_WIDTH,
    SUPPORT_HEIGHT
  );

  // Elevator
  fill(255, 128, 0);
  rect(
    robotX - ELEVATOR_WIDTH / 2,
    height - elevatorHeight - ROBOT_HEIGHT,
    ELEVATOR_WIDTH,
    elevatorHeight + 10,
    ELEVATOR_WIDTH / 2
  );

  // Arm
  strokeWeight(ARM_WIDTH);
  stroke(255, 128, 0);
  beginShape();
  vertex(
    robotX - ARM_LENGTH * Math.cos(armAngle),
    height -
      elevatorHeight -
      ROBOT_HEIGHT +
      ARM_WIDTH -
      ARM_LENGTH * Math.sin(armAngle)
  );
  vertex(
    robotX + ARM_LENGTH * Math.cos(armAngle),
    height -
      elevatorHeight -
      ROBOT_HEIGHT +
      ARM_WIDTH +
      ARM_LENGTH * Math.sin(armAngle)
  );
  endShape();
  // rect(robotX, height - elevatorHeight - ROBOT_HEIGHT, ARM_LENGTH, ARM_WIDTH);

  // The robot
  noStroke();
  fill(140, 38, 255);
  rect(
    robotX - ROBOT_WIDTH / 2,
    height - ROBOT_HEIGHT,
    ROBOT_WIDTH,
    ROBOT_HEIGHT,
    ROBOT_HEIGHT / 4,
    ROBOT_HEIGHT / 4
  );

  // The Coral
  fill(230);
  beginShape();
  vertex(
    robotX +
      ARM_LENGTH * Math.cos(armAngle) +
      (CORAL_WIDTH / 2) * Math.sin(armAngle),
    height -
      elevatorHeight -
      ROBOT_HEIGHT +
      ARM_WIDTH +
      ARM_LENGTH * Math.sin(armAngle) -
      (CORAL_WIDTH / 2) * Math.cos(armAngle)
  );
  vertex(
    robotX +
      ARM_LENGTH * Math.cos(armAngle) +
      CORAL_HEIGHT * Math.cos(armAngle) +
      (CORAL_WIDTH / 2) * Math.sin(armAngle),
    height -
      elevatorHeight -
      ROBOT_HEIGHT +
      ARM_WIDTH +
      ARM_LENGTH * Math.sin(armAngle) -
      (CORAL_WIDTH / 2) * Math.cos(armAngle) +
      CORAL_HEIGHT * Math.sin(armAngle)
  );
  vertex(
    robotX +
      ARM_LENGTH * Math.cos(armAngle) +
      CORAL_HEIGHT * Math.cos(armAngle) -
      (CORAL_WIDTH / 2) * Math.sin(armAngle),
    height -
      elevatorHeight -
      ROBOT_HEIGHT +
      ARM_WIDTH +
      ARM_LENGTH * Math.sin(armAngle) +
      (CORAL_WIDTH / 2) * Math.cos(armAngle) +
      CORAL_HEIGHT * Math.sin(armAngle)
  );
  vertex(
    robotX +
      ARM_LENGTH * Math.cos(armAngle) -
      (CORAL_WIDTH / 2) * Math.sin(armAngle),
    height -
      elevatorHeight -
      ROBOT_HEIGHT +
      ARM_WIDTH +
      ARM_LENGTH * Math.sin(armAngle) +
      (CORAL_WIDTH / 2) * Math.cos(armAngle)
  );
  endShape();
  if (checkbox.checked()) {
    if (0 <= mouseX && mouseX <= width && 0 <= mouseY && mouseY <= height) {
      let inverseKinematics = calculateKinematics(
        (mouseX - robotX) / SCALE,
        (height - mouseY - ROBOT_HEIGHT) / SCALE
      );
      if (inverseKinematics.theta) {
        armSlider.value(-inverseKinematics.theta);
        elevatorSlider.value(inverseKinematics.H);
        console.log(inverseKinematics);
      } else {
        console.log("HELP ME");
      }
    }
  }
}

function calculateKinematics(x, y) {
  const L = 18; // Length of the extending arm in inches

  // Clamp x to the valid range [-L, L]
  let clampedX = Math.max(-L, Math.min(L, x));

  // Calculate cos(theta) and theta in radians
  const cosTheta = clampedX / L;
  const thetaRadians = Math.acos(cosTheta);
  const sinTheta = Math.sqrt(1 - cosTheta ** 2);

  // Calculate the reachable vertical position
  const reachableY = L * sinTheta;

  // Calculate H to move as close as possible to y
  const H = y - reachableY;

  // Convert theta to degrees
  const thetaDegrees = (thetaRadians * 180) / Math.PI;

  return {
    theta: thetaDegrees.toFixed(2), // Theta in degrees
    H: H.toFixed(2), // Height of the main arm
    clampedX: clampedX.toFixed(2), // The adjusted x if clamping occurred
    isClamped: x !== clampedX, // Indicates if x was adjusted
  };
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
