import { res, Router } from 'express'
import Lists from '../models/list';


const listRouter = new Router()

listRouter.get('/lists', async function (req, res) {
  
  if (req.query.ListName) {
    var listName = req.query.ListName;
    var lists = await Lists.find({ ListName: {$regex: '.*' + listName + '.*' }});
  } else {
    var lists = await Lists.find({});
  }

  try {
    const formattedLists = lists.map((value) => ({ListID: value.id, ListName: value.ListName, Items: value.Items }))
    res.send(formattedLists);
  } catch (error) {
    res.status(500).send(error);
  }
});

listRouter.post('/lists', async function (req, res) {
  const newList = new Lists({ListName: "", Items: []});
  try {
    await newList.save();
    res.send({ListID: newList._id, ListName: newList.ListName, Items: newList.Items});
  } catch (error) {
    res.status(500).error(error);
  }
});

listRouter.patch("/lists/:id", async (req, res) => {
  try {

    let list = await Lists.findById(req.params.id);
    if (req.body.ListName) {
      list.ListName = req.body.ListName
    }
    if (req.body.Items) {
      list.Items = req.body.Items
    }
    await list.save();
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

listRouter.delete("/lists/:id", async (req, res) => {
  try {
    await Lists.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "List doesn't exist!" })
  }
});


export default listRouter
