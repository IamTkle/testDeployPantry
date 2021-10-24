import {
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  createStyles,
  Theme,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  MobileStepper,
  Checkbox,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { DOMAIN } from "../../../App";
import { APIRecipe, DetailedRecipe } from "./Recipe";
import { StyledActionButton } from "./RecipeEntry";

interface RecipeDetailProps {
  dialogOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dialogRecipeState: [
    DetailedRecipe,
    React.Dispatch<React.SetStateAction<DetailedRecipe>>
  ];
}

interface RecipeClick {
  basicInfo: APIRecipe;
  desc: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nextButton: {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },

    prevButton: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    exitButton: {
      backgroundColor: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: theme.palette.text.primary,
      },
    },

    startButton: {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },

    closeButton: {
      backgroundColor: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.error.main,
      },
    },

    step: {
      "& .MuiStepIcon-active ": {
        color: theme.palette.secondary.light,
        // backgroundColor: theme.palette.background.default,
      },
      "& .MuiStepIcon-completed": {
        color: theme.palette.primary.main,
        // backgroundColor: theme.palette.secondary.main,
      },
    },

    recipeSteps: {
      fontSize: "1.5rem",
      marginBottom: 0,
      minHeight: 0,
    },
  })
);

const RecipeDetailsDialog: React.FC<RecipeDetailProps> = ({
  dialogOpenState,
  dialogRecipeState,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [isOpen, setIsOpen] = dialogOpenState;

  const [recipe] = dialogRecipeState;

  const [activeStep, setActiveStep] = React.useState(-1);

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // React.useEffect(() => {
  //   fetch(DOMAIN + "/api/OnClickRecipe?recipeID=" + recipe.recipeId, {
  //     method: "GET",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //   }).then((resp) =>
  //     resp.json().then((data: RecipeClick) => {
  //       if (resp.ok) {
  //         setDesc(data.desc);
  //       } else
  //         enqueueSnackbar("Could not get recipe description!", {
  //           variant: "error",
  //         });
  //     })
  //   );
  // }, [enqueueSnackbar, recipe.recipeId]);

  // HANDLERS
  const handleStart = () => {
    //   fetch(DOMAIN + "/api/get")
    setActiveStep(0);
  };

  const handleExit = () => setActiveStep(-1);

  const handlePrev = () => setActiveStep((prev) => prev - 1);

  const handleNext = () => setActiveStep((prev) => prev + 1);

  const handleClose = () => {
    setIsOpen(false);
    setActiveStep(-1);
  };
  return (
    <Dialog
      open={isOpen}
      maxWidth="md"
      onClose={handleClose}
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle>
        <span>{recipe.recipeName}</span>

        <DialogActions>
          <ButtonGroup fullWidth variant="contained">
            {activeStep === -1 ? (
              <StyledActionButton
                className={classes.startButton}
                onClick={handleStart}
              >
                Start
              </StyledActionButton>
            ) : (
              <StyledActionButton
                className={classes.exitButton}
                onClick={handleExit}
              >
                Exit
              </StyledActionButton>
            )}
            <StyledActionButton
              className={classes.closeButton}
              onClick={handleClose}
            >
              Close
            </StyledActionButton>
          </ButtonGroup>
        </DialogActions>
      </DialogTitle>
      <DialogContent style={{ paddingBottom: theme.spacing(6) }}>
        <strong>Ingredients: </strong>
        <Container maxWidth="lg">
          <ol>
            {recipe.ingredientsList.map((ingr) => (
              <li key={ingr.ingredientId}>
                {ingr.ingredientName} : <strong>{ingr.amount}</strong> x{" "}
                <strong>{ingr.unitOfMeasure}</strong>
              </li>
            ))}
          </ol>
        </Container>
        {activeStep === -1 ? (
          <>
            <br />
            <hr />
            <div dangerouslySetInnerHTML={{ __html: recipe.desc }}></div>
          </>
        ) : (
          <>
            <Stepper
              activeStep={activeStep}
              orientation="horizontal"
              style={{ paddingInline: 0, overflowWrap: "anywhere" }}
            >
              {recipe.steps.instructions.map((_, i) => {
                return (
                  <Step key={i} classes={{ root: classes.step }}>
                    <StepLabel></StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <SwipeableViews index={activeStep} className={classes.recipeSteps}>
              {recipe.steps.instructions.map((instr, i) => {
                return (
                  <Step key={i} style={{ marginBottom: 0 }}>
                    <StepLabel>Step {i + 1}</StepLabel>
                    <Container>{instr}</Container>
                  </Step>
                );
              })}
            </SwipeableViews>
            <MobileStepper
              activeStep={activeStep}
              steps={recipe.steps.instructions.length}
              backButton={
                <StyledActionButton
                  className={classes.prevButton}
                  onClick={handlePrev}
                  disabled={activeStep === 0}
                >
                  Prev
                </StyledActionButton>
              }
              nextButton={
                <StyledActionButton
                  className={classes.nextButton}
                  onClick={handleNext}
                  disabled={activeStep === recipe.steps.instructions.length - 1}
                >
                  Next
                </StyledActionButton>
              }
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailsDialog;
