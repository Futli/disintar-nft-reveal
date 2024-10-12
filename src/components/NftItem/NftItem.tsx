import { NftItem, NftRevealMode } from "../NftList/types";
import { beginCell, toNano } from "@ton/core";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { CardActions, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const NftItemComponent = ({
  item,
  sendTx,
}: {
  item: NftItem;
  sendTx: (tx: any) => void;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [itemDetails, setItemDetails] = useState<NftItem>(item);

  const fetchItemIpfs = async (route: any) => {
    await fetch(route)
      .then((response) => response.json())
      .then((response) => {
        setItemDetails((prev: any) => ({
          ...prev,
          ...response,
        }));
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  useEffect(() => {
    setItemDetails(item);
    //fetchItemIpfs(item?.parsed_nft_content_offchain_url);
  }, []);

  const handleReveal = async (item: NftItem) => {
    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: item?.address__friendly,
          amount: toNano("1").toString(),
          body: beginCell()
            .storeUint(0, 32)
            .storeStringTail("reveal")
            .endCell(),
        },
      ],
    };
    sendTx(tx);
  };

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/360";
  };

  const renderImage = () => {
    if (!itemDetails.thumbnail) {
      return (
        <CardMedia
          component="img"
          sx={{ height: 360, objectFit: "contain", padding: 4 }}
          image={"https://via.placeholder.com/360"}
          title={itemDetails?.name}
          onError={handleImageError}
        />
      );
    }
    if (itemDetails?.thumbnail.endsWith(".mp4")) {
      return (
        <CardMedia
          component="video"
          sx={{ height: 360, objectFit: "contain", padding: 4 }}
          image={itemDetails?.thumbnail}
          title={itemDetails?.name}
          onError={handleImageError}
        />
      );
    }

    return (
      <CardMedia
        component="img"
        sx={{ height: 360, objectFit: "contain", padding: 4 }}
        image={itemDetails?.image}
        title={itemDetails?.name}
        onError={handleImageError}
      />
    );
  };

  const Status = ({ status }: { status: NftRevealMode }) => {
    switch (status) {
      case NftRevealMode.ReadyToReveal:
        return (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleReveal(item)}
          >
            Reveal
          </Button>
        );
      case NftRevealMode.Pending:
        return (
          <Button variant="contained" size="small" disabled>
            Pending
          </Button>
        );
      case NftRevealMode.Opened:
        return (
          <Button variant="contained" size="small" disabled>
            Opened
          </Button>
        );
      default:
        return (
          <Button variant="contained" size="small" disabled>
            Unknown
          </Button>
        );
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader title={itemDetails?.name || itemDetails?.error} />
      {renderImage()}
      <CardContent>
        <Typography gutterBottom variant="caption" component="div">
          {item?.address__friendly}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: "red" }}
          component="div"
        >
          {error}
        </Typography>
      </CardContent>
      <CardActions>
        <Status status={itemDetails?.parsed_nft_reveal_mode} />
      </CardActions>
    </Card>
  );
};

export { NftItemComponent };
