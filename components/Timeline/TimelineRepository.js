import moment from "moment";

/*
TimelineObject
{
  type: "any",
  timestamp: DateTime,
  ...
}

*/

function TimelineRepository() {
  const now = new moment();
  this.getAll = () => [
    {
      type: "transaction",
      transactionType: "Send",
      timestamp: now.format("MMM D") + " at " + now.format("HH:mm"),
      address: "0xCca2bd5957073026b56Cdaaeb282AD4a61619a3a",
      amount: 10,
      ticker: "PBC",
    },
    {
      type: "transaction",
      transactionType: "Receive",
      timestamp: now.format("MMM D") + " at " + now.format("HH:mm"),
      address: "0xCca2bd5957073026b56Cdaaeb282AD4a61619a3a",
      amount: 40,
      ticker: "PBC",
    },
    {
      type: "community_message",
      timestamp: now.format("MMM D") + " at " + now.format("HH:mm"),
      message: "Votes have finished for initial campaign!",
      community: "Poblado",
    },
    {
      type: "community_message",
      timestamp: now.format("MMM D") + " at " + now.format("HH:mm"),
      message:
        "This is a very long message Human Beings are born and remain free and equal in rights. Social distinctions can be founded only on the common good.",
      community: "Poblado",
    },
  ];
}

export default TimelineRepository;
