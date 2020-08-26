const Auctions = require("./../../models/Auctions.js");
const mongoose_connect = require("../../mongose_connect.js");
const end_auction = require("./end_auction.js");

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

async function auction_tick() {
  let auctions = await Auctions.aggregate([])
    .match({
      is_opened: { $eq: true },
      extended_to: { $lte: Date.now() },
    })
    .project({
      _id: 1,
      is_opened: 1,
      owner_id: 1,
      card_id: 1,
      extended_to: 1,
    });
  console.log(auctions);
  if (auctions.length) {
    end_auction(auctions);
  }
  return;
}

let currentVal = 0;
if (isMainThread) {
  console.log("this is the main thread");
  let w = new Worker(__filename, { workerData: 1 });
} else {
  console.log("this is a second thread");
  mongoose_connect();
  setInterval(async (a) => (currentVal = await auction_tick()), 1000);
}
