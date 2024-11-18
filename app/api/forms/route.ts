import client from "@/db"; // Assuming Prisma client import
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, description, questions } = await req.json();

    // Log incoming data to check the structure
    console.log('Received form data:', { title, description, questions });

    // Ensure all data fields are present
    if (!title || !description || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the form entry
    const form = await client.form.create({
      data: {
        title,
        description,
      },
    });

    // Create questions and options
    const questionPromises = questions.map(async (q) => {
      if (!q.question || !q.type || !Array.isArray(q.options)) {
        throw new Error(`Invalid question format: ${JSON.stringify(q)}`);
      }

      const question = await client.question.create({
        data: {
          question: q.question,
          type: q.type,  // Use 'multiple-choice', 'single-select', etc.
          formId: form.id,
        },
      });

      // Create options for the question
      const optionPromises = q.options.map((optionText) =>
        client.option.create({
          data: {
            text: optionText,
            questionId: question.id,
          },
        })
      );

      await Promise.all(optionPromises); 
    });

    await Promise.all(questionPromises); 

    return NextResponse.json({ id: form.id });
  } catch (error) {
    console.error("Error saving form:", error);
    return NextResponse.json({ error: 'Error saving form: ' + error.message }, { status: 500 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    const form = await client.form.findUnique({
      where: { id: Number(id) },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}