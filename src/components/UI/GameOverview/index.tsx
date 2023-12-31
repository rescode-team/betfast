/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { BetDialog } from "./BetDialog";
import { Button, Typography, Dialog } from "@material-tailwind/react";
import { ts2DateOptions, ts2TimeOptions } from "@/utils/timestamp";
import SportIcon from "../SportIcon";

export default function GameOverview({
  details,
}: {
  finished: boolean;
  details: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [isBack, setIsBack] = React.useState(true);
  const [selectedTeam, setSelectedTeam] = React.useState(0);

  const handleOffer = (
    argIsBack: boolean = true,
    argSelectedTeam: number = 0,
  ) => {
    setIsBack(argIsBack);
    setSelectedTeam(argSelectedTeam);
    setOpen(!open);
  };

  return (
    details && (
      <div>
        <div className="relative mx-auto flex items-center w-full text-blue-gray-900">
          <Link
            className="float-left mr-auto"
            href={
              "/sports/gamedetails?category=" +
              details.category +
              "&eventGroup=" +
              details.eventGroup +
              "&eventAccount=" +
              details.eventAccount
            }
          >
            <Typography variant="paragraph" className="flex">
              <SportIcon sportName={details.category} />
              &nbsp;{details.eventGroupTitle}
            </Typography>
            <Typography variant="h6">
              {" "}
              {details.participants[0].name} vs {details.participants[1].name}{" "}
            </Typography>
            {/* <Typography variant="paragraph" className="text-link">
              {" "}
              Liquidity: <span>$0 USDC</span>{" "}
            </Typography> */}
          </Link>
          <div className="mr-4">
            <Typography variant="h6" className="text-right">
              {ts2TimeOptions(details.eventStart)}
            </Typography>
            <Typography variant="h6">
              {ts2DateOptions(details.eventStart)}
            </Typography>
          </div>

          {new Date().getTime() > details.eventStart * 1000 ? (
            <Button variant="gradient" className="h-full">
              FINISHED
            </Button>
          ) : (
            <div className="flex">
              {details.markets[0].outcomes.map(
                (outcome: any, index: number) => (
                  <div className="ml-4" key={index}>
                    <Typography
                      variant="paragraph"
                      className="text-center text-ellipsis overflow-hidden max-w-160px mg-auto truncate"
                    >
                      {outcome}
                    </Typography>
                    <div className="flex">
                      <Button
                        variant="gradient"
                        color="cyan"
                        className="mr-4 float-left w-[100px]"
                        onClick={() => {
                          handleOffer(true, index);
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="gradient"
                        color="deep-orange"
                        className="float-right w-[100px]"
                        onClick={() => {
                          handleOffer(false, index);
                        }}
                      >
                        Lay
                      </Button>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
          <Dialog open={open} handler={() => {}}>
            <BetDialog
              handleOpen={handleOffer}
              details={details}
              isBack={isBack}
              team={selectedTeam}
              marketIndex={-1}
            />
          </Dialog>
        </div>
      </div>
    )
  );
}
