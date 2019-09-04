package com.example.ssafy_book;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

public class RecyclerAdapter extends RecyclerView.Adapter<RecyclerAdapter.ViewHolder> {
    Context context;


    List<CardViewItem> items;
    int item_layout, boardId;

    FragmentManager fragManager;
    FragmentTransaction fragTransaction;

    BookDetailFragment bookDetailFragment;
    SellerBookDetailFragment sellerBookDetailFragment;

    public RecyclerAdapter(Context context, List<CardViewItem> items, int item_layout) {
        this.context=context;
        this.items=items;
        this.item_layout=item_layout;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.activity_card_view,null);

        return new ViewHolder(v);
    }

    @TargetApi(Build.VERSION_CODES.JELLY_BEAN)
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        CardViewItem item = items.get(position);

        bookDetailFragment = new BookDetailFragment();
        sellerBookDetailFragment = new SellerBookDetailFragment();

        Drawable drawable=context.getResources().getDrawable(item.getImage());

        holder.image.setBackground(drawable);
        holder.title.setText(item.getTitle());
        holder.state.setText(item.getState());


        holder.cardview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boardId = item.getBoardId();

               //번들써서 구분할수있는 무언가를 넘겨줘야함 txid?
               Activity activity = (Activity)v.getContext();

               Bundle bundle = new Bundle();

               bundle.putInt("boardAccount",boardId);

               MainActivity mainActivity = new MainActivity();
                //판매자, 구매자 구분해서 fragment 호출
                Log.d("mainActivitySwitch", String.valueOf(mainActivity.switchCheck));

                if(mainActivity.switchCheck) {
                    sellerBookDetailFragment.setArguments(bundle);
                    activity.getFragmentManager().beginTransaction().replace(R.id.frame, sellerBookDetailFragment).addToBackStack(null).commit();
                }else{
                    bookDetailFragment.setArguments(bundle);
                    activity.getFragmentManager().beginTransaction().replace(R.id.frame, bookDetailFragment).addToBackStack(null).commit();
                }

            }
        });
    }

    @Override
    public int getItemCount() {
        return this.items.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        ImageView image;
        TextView title;
        TextView state;
        CardView cardview;

        public ViewHolder(View itemView) {
            super(itemView);

            image=(ImageView)itemView.findViewById(R.id.image);
            title=(TextView)itemView.findViewById(R.id.title);
            state=(TextView)itemView.findViewById(R.id.state);
            cardview=(CardView)itemView.findViewById(R.id.card_view);
        }
    }
}