export const cards = [
    {
        id: 0,
        label: (consumedSoFar, totalDaily) => `${consumedSoFar} out of ${totalDaily} calories consumed today`,
        labelValMissing: 'You haven\'t logged any nutrition today',
        color: '#bee5d3',
            colors: ['#60b38c', '#7dd4ac'],
        colors: ['#rgba(125, 212, 172, 0.6)', 'rgba(125, 212, 172, 0.6)'],
        icon: { name: 'food-apple', type: 'material-community', color: '#60b38c', size: 28, progressColor: '#469c73', },
        subLabel: () => 'Log nutrition...', 
        isActive: true,
    }, 
    {
        id: 1,
        label: (sleep) => `${sleep} hours of sleep today`,
        labelValMissing: 'How did you sleep?',
        subLabel: () => 'Log sleep...',
        color: 'rgba(149, 177, 240, 0.6)',
        colors: ['rgba(149, 177, 240, 0.6)', 'rgba(149, 177, 240, 1)'],
        icon: { name: 'bedtime', type: 'material', color: '#779ecb', size: 28, progressColor: '#3e4772'},
        isActive: true,
        screenName: 'Sleep'

    },
    {
        id: 2,
        label: (curWeight) => `Current weight ${curWeight} kg`,
        labelValMissing: 'Set a goal weight',
        color: 'rgba(150, 113, 114, 0.6)',
        //colors: [ '#967172', '#cf8f90', ],
        colors: [ 'rgba(150, 113, 114, 0.7)', 'rgba(150, 113, 114, 0.6)'],
        icon: { name: 'scale-bathroom', type: 'material-community', color: '#8b5e83', size: 28, progressColor: '#8b5e83', shadowColor: '#8b5e83' },
        subLabel: (goalWeight) => `${goalWeight && `Goal weight is ${goalWeight}  kg \n`}Log your weight...`,
        isActive: true,
    },
    {
        id: 3,
        label: (nextMeal) => `Your next meal is ${nextMeal}`,
        labelStyle: { paddingTop: 25},
        labelValMissing: 'Create a personal meal plan',
        color: 'rgba(242, 242, 242, 0.5)',
        colors: [ 'rgba(242, 242, 242, 0.7)', 'rgba(242, 242, 242, 0.5)', ],
        icon: { name: 'local-restaurant', type: 'material', color: '#615c5c', size: 28, progressColor: '#615c5c', shadowColor: '#615c5c' },
        subLabel: () => '',
        isActive: true,
    },
    {
        id: 4,
        label: (workoutsSoFar, workoutgoal) => `${workoutsSoFar} out of ${workoutgoal} workouts this week!`,
        labelValMissing : () => 'Set a weekly workout goal',
        labelStyle: { paddingTop: 25},
        color: 'rgba(65, 67, 71, 0.55)',
        colors: [ 'rgba(65, 67, 71, 0.55)', 'rgba(65, 67, 71, 0.45)', ],
        icon: { name: 'dumbbell', type: 'material-community', size: 28, color: '#383428', progressColor: '#202329', shadowColor: '#202329'},
        subLabel: () => '',
        isActive: true,
    }
]