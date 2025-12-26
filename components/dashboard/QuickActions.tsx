
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Link, ArrowRight } from "lucide-react";

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 md:gap-4">
        <Button className="blue-gradient w-full justify-start gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Plan
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2">
          <Link className="h-4 w-4" />
          Copy Checkout Link
        </Button>
        <div className="rounded-md bg-gradient-subtle p-3 md:p-4">
          <div className="mb-2 text-sm font-medium">Increase Revenue</div>
          <p className="text-xs text-muted-foreground">
            Create personalized upsell emails to boost conversions.
          </p>
          <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs">
            Learn more <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;