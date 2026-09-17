import Habit from "../models/Habit.js";

export const createHabit = async(req,res)=>{
    try{
        const { title } = req.body;

        const habit = await Habit.create({
            user:req.user,
            title,
        });
        res.status(201).json(habit);
    }catch(error){
        res.status(500).json({ error:error.message});
    }
};

export const markComplete = async(req,res)=>{
    try{
      const habit = await Habit.findById(req.params.id);

      if(!habit){
        return res.status(404).json({message:"Habit not found"});
      }
      const today = new Date();

const lastDate = habit.completedDates.slice(-1)[0];

if (lastDate) {
  const diff = Math.floor(
    (today - new Date(lastDate)) / (1000 * 60 * 60 * 24)
  );
  if(diff === 0){
    return res.json(habit);
  }
  if (diff === 1) {
    habit.streak += 1;
  } else if (diff > 1) {
    habit.streak = 1;
  }
} else {
  habit.streak = 1;
}

habit.completedDates.push(today);
      await habit.save();
      res.json(habit);
    }catch(error){
      res.status(500).json({error:error.message});
    }
};

export const getHabits = async(req,res)=>{
    try{
        const habits = await Habit.find({ user:req.user}).sort({createdAt: -1});

        res.json(habits);
    }catch(error){
        res.status(500).json({ error:error.message });
    }
};

export const deleteHabit = async(req,res)=>{
    try{
        await Habit.findByIdAndDelete(req.params.id);
        res.json({message:"Habit deleted"});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
export const updateHabit = async (req, res) => {
  try {
    const { title } = req.body;

    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};