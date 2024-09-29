<?php

namespace Buffet\Types;

enum Status: string {
    case Pending = 'pending';
    case Success = 'success';
    case Failed = 'failed';
}