import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

export const PostCard = ({ post }: { post: any }) => {
  const router = useRouter();
  const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/post/[id]",
      query: { id: post._id},
      locale: router.locale 
    } as any);
  };

  return (
    <Card
      isPressable
      isHoverable
      css={{ w: "100%", h: "400px" }}
      onClick={handleClick as any}
    >
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase">
            {post.title}
          </Text>
          <Text h3>{post.description}</Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={post.thumbnail}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text h6 color="#000" size={12}>
              5 mins to read
            </Text>
            {/* <Text h6 color="#000" size={12}>
              Get notified.
            </Text> */}
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button flat auto rounded color="secondary">
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  Read Now
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
