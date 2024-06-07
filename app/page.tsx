export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Hey There, Welcome! 👋🏼</h1>
      <p className="prose prose-neutral dark:prose-invert">
        I'm Jose.<br />
        Obsessed with neural networks and biohacking. I tinker with awesome tech at{' '}
        <a href="https://www.intuitivo.com/" target="_blank" rel="noopener noreferrer">
          intuitivo.com
        </a>.
        Tech geek at heart, open-source lover, and always eager to plug into new machine learning adventures!
      </p>
      <p className="my-8" />
      <p className="prose prose-neutral dark:prose-invert">
        📝{' '}
        <a
          href="https://aws.amazon.com/blogs/machine-learning/intuitivo-achieves-higher-throughput-while-saving-on-ai-ml-costs-using-aws-inferentia-and-pytorch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AWS Blog Colab - Talking about Inf1 and Inf2 Chips
        </a>
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        📹{' '}
        <a
          href="https://www.youtube.com/live/xWZ9mW7Z4Tc?si=e9eTO6KDl4xBdAHA&t=21551"
          target="_blank"
          rel="noopener noreferrer"
        >
          YoloVision Conf - The Power of Foundation Model in Data Collection
        </a>
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        📹{' '}
        <a
          href="https://www.youtube.com/watch?v=IXhUOPBqyz4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Funny talk with Satya Mallick, CEO at OpenCV, the world's largest computer vision library
        </a>
      </p>
    </section>
  );
}
